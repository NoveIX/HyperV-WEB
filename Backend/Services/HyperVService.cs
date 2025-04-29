using System.Diagnostics;
using System.Text.Json;
using System.Collections.Generic;

namespace Backend.Services
{
    public class HyperVService
    {
        public List<VMInfo> GetVMs()
        {
            try
            {
                var psi = new ProcessStartInfo()
                {
                    FileName = "powershell",
                    Arguments = "Get-VM | Select-Object Name, State | ConvertTo-Json",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                if (process == null)
                    return new List<VMInfo>();
                    
                string output = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                
                if (string.IsNullOrWhiteSpace(output))
                    return new List<VMInfo>();
                    
                // Gestisce sia il caso di un singolo oggetto che di un array
                if (output.TrimStart().StartsWith("{"))
                {
                    // È un singolo oggetto
                    var singleVM = JsonSerializer.Deserialize<VMInfo>(output);
                    return singleVM != null ? new List<VMInfo> { singleVM } : new List<VMInfo>();
                }
                
                return JsonSerializer.Deserialize<List<VMInfo>>(output) ?? new List<VMInfo>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante il recupero delle VM: {ex.Message}");
                return new List<VMInfo>();
            }
        }

        public string StartVM(string name)
        {
            var psi = new ProcessStartInfo()
            {
                FileName = "powershell",
                Arguments = $"Start-VM -Name '{name}'",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            using var process = Process.Start(psi);
            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();
            return output;
        }

        public string StopVM(string name)
        {
            var psi = new ProcessStartInfo()
            {
                FileName = "powershell",
                Arguments = $"Stop-VM -Name '{name}' -Force",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            using var process = Process.Start(psi);
            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();
            return output;
        }

        public string DeleteVM(string name)
        {
            var psi = new ProcessStartInfo()
            {
                FileName = "powershell",
                Arguments = $"Remove-VM -Name '{name}' -Force",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            using var process = Process.Start(psi);
            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();
            return output;
        }
    }

    public class VMInfo
    {
        public string Name { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
    }
}