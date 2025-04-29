using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HyperVController : ControllerBase
    {
        private readonly HyperVService _hyperVService = new HyperVService();

        [HttpGet("vms")]
        public IActionResult GetVMs()
        {
            var vms = _hyperVService.GetVMs();
            if (vms == null)
                return Ok(new List<VMInfo>()); // Restituisce sempre un array JSON
            return Ok(vms);
        }

        [HttpPost("start/{name}")]
        public IActionResult StartVM(string name)
        {
            var result = _hyperVService.StartVM(name);
            if (string.IsNullOrEmpty(result))
                return BadRequest(new { error = "Impossibile avviare la VM." });
            return Ok(result);
        }

        [HttpPost("stop/{name}")]
        public IActionResult StopVM(string name)
        {
            var result = _hyperVService.StopVM(name);
            if (string.IsNullOrEmpty(result))
                return BadRequest(new { error = "Impossibile arrestare la VM." });
            return Ok(result);
        }

        [HttpDelete("delete/{name}")]
        public IActionResult DeleteVM(string name)
        {
            var result = _hyperVService.DeleteVM(name);
            if (string.IsNullOrEmpty(result))
                return BadRequest(new { error = "Impossibile eliminare la VM." });
            return Ok(result);
        }

        [HttpPost("shutdown")]
        public IActionResult ShutdownServices()
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
            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();
            return Ok("Servizi in arresto");
        }
    }
}