using Exercise2.Models;
using Exercise2.Services;


namespace Exercise2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string csvFile = "data.csv";

            // Stops execution if the source file cannot be found
            if (!File.Exists(csvFile))
            {
                Console.WriteLine("The source file was not found.");
                return;
            }

            // Reads all lines from the file and skips the header row
            IEnumerable<string> rows = File.ReadAllLines(csvFile).Skip(1);

            // Converts each row into a Person object, ignoring empty lines
            List<Person> people = rows
                .Where(line => !string.IsNullOrWhiteSpace(line))
                .Select(MapToPerson)
                .ToList();

            DataParseService dataParseService = new DataParseService();

            // Generates the first output file with name frequency results
            IEnumerable<string> nameResults = dataParseService.SortNames(people);
            File.WriteAllLines("names_sorted.txt", nameResults);

            // Generates the second output file with addresses sorted by street name
            IEnumerable<string> addressResults = dataParseService.SortAddresses(people);
            File.WriteAllLines("addresses_sorted.txt", addressResults);

            Console.WriteLine("Processing complete. Files generated successfully.");
        }

        // Converts a CSV line into a Person object using safe column access
        private static Person MapToPerson(string line)
        {
            string[] columns = line.Split(',');

            return new Person
            {
                FirstName = GetValue(columns, 0),
                LastName = GetValue(columns, 1),
                Address = GetValue(columns, 2),
                PhoneNumber = GetValue(columns, 3)
            };
        }

        // Safely retrieves a column value by index and returns an empty string if it does not exist
        private static string GetValue(string[] columns, int index)
        {
            string? value = columns.ElementAtOrDefault(index);

            if (string.IsNullOrWhiteSpace(value))
            {
                return string.Empty;
            }

            return value.Trim().Trim('"');
        }
    }
}