using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Backend.Services;
using System;
using System.IO;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HyperVController : ControllerBase
    {
        private readonly HyperVService _hyperVService;  
        
        public HyperVController(HyperVService hyperVService)
        {
            _hyperVService = hyperVService;
        }

        [HttpGet("vms")]
        public IActionResult GetVMs()
        {
            try
            {
                var vms = _hyperVService.GetVMs();
                return Ok(vms); // Il metodo GetVMs ora gestisce già i casi null
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Errore durante il recupero delle VM: {ex.Message}" });
            }
        }

        [HttpPost("start/{name}")]
        public IActionResult StartVM(string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                    return BadRequest(new { error = "Nome della VM non specificato." });
                    
                var result = _hyperVService.StartVM(name);
                if (string.IsNullOrEmpty(result))
                    return BadRequest(new { error = "Impossibile avviare la VM." });
                    
                return Ok(new { message = $"VM {name} avviata con successo", details = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Errore durante l'avvio della VM: {ex.Message}" });
            }
        }

        [HttpPost("stop/{name}")]
        public IActionResult StopVM(string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                    return BadRequest(new { error = "Nome della VM non specificato." });
                    
                var result = _hyperVService.StopVM(name);
                if (string.IsNullOrEmpty(result))
                    return BadRequest(new { error = "Impossibile arrestare la VM." });
                    
                return Ok(new { message = $"VM {name} arrestata con successo", details = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Errore durante l'arresto della VM: {ex.Message}" });
            }
        }

        [HttpDelete("delete/{name}")]
        public IActionResult DeleteVM(string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                    return BadRequest(new { error = "Nome della VM non specificato." });
                    
                var result = _hyperVService.DeleteVM(name);
                if (string.IsNullOrEmpty(result))
                    return BadRequest(new { error = "Impossibile eliminare la VM." });
                    
                return Ok(new { message = $"VM {name} eliminata con successo", details = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Errore durante l'eliminazione della VM: {ex.Message}" });
            }
        }

        [HttpPost("shutdown")]
        public IActionResult ShutdownServices()
        {
            try
            {
                Console.WriteLine("Tentativo di arrestare i servizi...");
                
                // Ottieni il percorso corrente dell'applicazione
                string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
                string batchFilePath = Path.Combine(currentDirectory, "..\\stop_services.bat");
                
                Console.WriteLine($"Percorso del file batch: {batchFilePath}");
                
                if (!System.IO.File.Exists(batchFilePath))
                {
                    string errorMsg = $"File batch non trovato: {batchFilePath}";
                    Console.WriteLine(errorMsg);
                    return StatusCode(500, new { error = errorMsg });
                }
                
                var psi = new ProcessStartInfo()
                {
                    FileName = "cmd.exe",
                    Arguments = $"/c \"{batchFilePath}\"",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    WorkingDirectory = currentDirectory
                };
                
                Console.WriteLine($"Esecuzione comando: {psi.FileName} {psi.Arguments}");
                using var process = Process.Start(psi);
                
                if (process == null)
                {
                    string errorMsg = "Impossibile avviare il processo di arresto.";
                    Console.WriteLine(errorMsg);
                    return StatusCode(500, new { error = errorMsg });
                }
                    
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();
                process.WaitForExit();
                
                Console.WriteLine($"Exit code: {process.ExitCode}");
                Console.WriteLine($"Output: {output}");
                
                if (!string.IsNullOrEmpty(error))
                {
                    Console.WriteLine($"Errore: {error}");
                }
                
                if (process.ExitCode != 0)
                {
                    string errorMsg = "Errore durante l'arresto dei servizi.";
                    Console.WriteLine($"{errorMsg} Exit code: {process.ExitCode}");
                    return StatusCode(500, new { error = errorMsg, details = output, errorDetails = error });
                }
                    
                return Ok(new { message = "Servizi in fase di arresto", details = output });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante l'arresto dei servizi: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { error = $"Errore durante l'arresto dei servizi: {ex.Message}" });
            }
        }
    }
}