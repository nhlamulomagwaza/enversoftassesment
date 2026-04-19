using System.Collections.Generic;
using Exercise2.Models;
using Exercise2.Services;
using Xunit;

namespace Exercise_2.Tests
{
    public class DataParseServiceTests
    {
        [Fact]
        public void NamesSortingTest()
        {
         
            DataParseService parseData = new DataParseService();
            List<Person> personData = new List<Person>
            {
                new Person { FirstName = "Nhlamulo", LastName = "Magwaza" },
                new Person { FirstName = "Oral", LastName = "Magwaza" }
            };

           
            List<string> results = parseData.SortNames(personData).ToList();

         
            Assert.Equal("Magwaza, 2", results[0]);
        }

        [Fact]
        public void AddressesSortingTest()
        {
          
            DataParseService parseData = new DataParseService();
            List<Person> addressData = new List<Person>
            {
                new Person { Address = "94 Roland St" },
                new Person { Address = "78 Short Lane" }
            };

       
            List<string> results = parseData.SortAddresses(addressData).ToList();

         
            Assert.Equal("94 Roland St", results[0]);
        }
    }
}