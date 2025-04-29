using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Backend.Services;
using System;

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
                var psi = new ProcessStartInfo()
                {
                    FileName = "cmd.exe",
                    Arguments = "/c ..\\stop_services.bat",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                
                if (process == null)
                    return StatusCode(500, new { error = "Impossibile avviare il processo di arresto." });
                    
                string output = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                
                if (process.ExitCode != 0)
                    return StatusCode(500, new { error = "Errore durante l'arresto dei servizi.", details = output });
                    
                return Ok(new { message = "Servizi in fase di arresto", details = output });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Errore durante l'arresto dei servizi: {ex.Message}" });
            }
        }
    }
}