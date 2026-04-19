using Exercise2.Models;
namespace Exercise2.Services
{
    public class DataParseService
    {
        public IEnumerable<string> SortNames(List<Person> data)
        {
            // Here I'm combining first and last names into one list
            IEnumerable<string> allNames = data.Select(person => person.FirstName)
                                               .Concat(data.Select(person => person.LastName));

            // Grouping by name and then
            // selecting the name and count, sorting by count and then by name, and finally formatting the output
            return allNames.GroupBy(name => name)
                .Select(group => new { Name = group.Key, Count = group.Count() })
                .OrderByDescending(result => result.Count)
                .ThenBy(result => result.Name)
                .Select(result => $"{result.Name}, {result.Count}");
        }

        public IEnumerable<string> SortAddresses(List<Person> people)
        {
            // Selecting the address and then sorting
            return people.Select(person => person.Address.Trim())
                .OrderBy(address => string.Join(" ", address.Split(' ').Skip(1)))
                .ThenBy(address => address);
        }
    }
}