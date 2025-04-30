using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace Backend.Services
{
    public class HyperVService
    {
        private static JsonSerializerOptions GetJsonOptions()
        {
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            options.Converters.Add(new JsonStringEnumConverter());
            return options;
        }
        public List<VMInfo> GetVMs()
        {
            try
            {
                Console.WriteLine("Tentativo di recupero delle VM da Hyper-V...");
                var psi = new ProcessStartInfo()
                {
                    FileName = "powershell",
                    Arguments = "Get-VM | Select-Object Name, @{Name='State';Expression={$_.State.ToString()}} | ConvertTo-Json -Depth 1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                if (process == null)
                {
                    Console.WriteLine("Errore: Impossibile avviare il processo PowerShell");
                    return new List<VMInfo>();
                }
                    
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();
                process.WaitForExit();
                
                Console.WriteLine($"Exit code: {process.ExitCode}");
                
                if (!string.IsNullOrEmpty(error))
                {
                    Console.WriteLine($"Errore PowerShell: {error}");
                }
                
                if (string.IsNullOrWhiteSpace(output))
                {
                    Console.WriteLine("Nessun output ricevuto dal comando Get-VM");
                    return new List<VMInfo>();
                }
                
                Console.WriteLine($"Output ricevuto: {output}");
                    
                // Gestisce sia il caso di un singolo oggetto che di un array
                if (output.TrimStart().StartsWith("{"))
                {
                    // È un singolo oggetto
                    Console.WriteLine("Rilevata una singola VM");
                    var singleVM = JsonSerializer.Deserialize<VMInfo>(output, GetJsonOptions());
                    return singleVM != null ? new List<VMInfo> { singleVM } : new List<VMInfo>();
                }
                
                var vms = JsonSerializer.Deserialize<List<VMInfo>>(output, GetJsonOptions()) ?? new List<VMInfo>();
                Console.WriteLine($"VM trovate: {vms.Count}");
                return vms;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante il recupero delle VM: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return new List<VMInfo>();
            }
        }

        public string StartVM(string name)
        {
            try
            {
                Console.WriteLine($"Tentativo di avviare la VM: {name}");
                var psi = new ProcessStartInfo()
                {
                    FileName = "powershell",
                    Arguments = $"Start-VM -Name '{name}'",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                if (process == null)
                {
                    Console.WriteLine("Errore: Impossibile avviare il processo PowerShell per l'avvio della VM");
                    return string.Empty;
                }
                
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();
                process.WaitForExit();
                
                Console.WriteLine($"Exit code avvio VM: {process.ExitCode}");
                
                if (!string.IsNullOrEmpty(error))
                {
                    Console.WriteLine($"Errore PowerShell durante l'avvio della VM: {error}");
                    return error;
                }
                
                Console.WriteLine($"Output avvio VM: {output}");
                return output;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante l'avvio della VM: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return ex.Message;
            }
        }

        public string StopVM(string name)
        {
            try
            {
                Console.WriteLine($"Tentativo di arrestare la VM: {name}");
                var psi = new ProcessStartInfo()
                {
                    FileName = "powershell",
                    Arguments = $"Stop-VM -Name '{name}' -Force",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                if (process == null)
                {
                    Console.WriteLine("Errore: Impossibile avviare il processo PowerShell per l'arresto della VM");
                    return string.Empty;
                }
                
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();
                process.WaitForExit();
                
                Console.WriteLine($"Exit code arresto VM: {process.ExitCode}");
                
                if (!string.IsNullOrEmpty(error))
                {
                    Console.WriteLine($"Errore PowerShell durante l'arresto della VM: {error}");
                    return error;
                }
                
                Console.WriteLine($"Output arresto VM: {output}");
                return output;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante l'arresto della VM: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return ex.Message;
            }
        }

        public string DeleteVM(string name)
        {
            try
            {
                Console.WriteLine($"Tentativo di eliminare la VM: {name}");
                var psi = new ProcessStartInfo()
                {
                    FileName = "powershell",
                    Arguments = $"Remove-VM -Name '{name}' -Force",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                if (process == null)
                {
                    Console.WriteLine("Errore: Impossibile avviare il processo PowerShell per l'eliminazione della VM");
                    return string.Empty;
                }
                
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();
                process.WaitForExit();
                
                Console.WriteLine($"Exit code eliminazione VM: {process.ExitCode}");
                
                if (!string.IsNullOrEmpty(error))
                {
                    Console.WriteLine($"Errore PowerShell durante l'eliminazione della VM: {error}");
                    return error;
                }
                
                Console.WriteLine($"Output eliminazione VM: {output}");
                return output;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante l'eliminazione della VM: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return ex.Message;
            }
        }
    }

    public class VMInfo
    {
        public string Name { get; set; } = string.Empty;
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public VMState State { get; set; }
    }
    
    public enum VMState
    {
        Off,
        Running,
        Paused,
        Saved,
        Starting,
        Stopping
    }
}