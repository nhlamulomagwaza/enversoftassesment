namespace Exercise1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] list1 = new int[] { 1, 2, 3, 4, 5 };
            int[] list2 = new int[] { 3, 4, 5, 6, 7 };

            // Finds values that exist in both list1 and list2
            IEnumerable<int> commonElements = list1.Intersect(list2);

            Console.WriteLine("Values in both list1 and list2:");
            Console.WriteLine(string.Join(" ", commonElements));

            Console.WriteLine();

            // Finds values that exist in list1 but not in list2
            IEnumerable<int> onlyInList1 = list1.Except(list2);

            Console.WriteLine("Values in list1 but not in list2:");
            Console.WriteLine(string.Join(" ", onlyInList1));

            Console.WriteLine();

            // Finds values that exist in list2 but not in list1
            IEnumerable<int> onlyInList2 = list2.Except(list1);

            Console.WriteLine("Values in list2 but not in list1:");
            Console.WriteLine(string.Join(" ", onlyInList2));

            Console.WriteLine();

            Console.WriteLine("Press <ENTER> to continue");
            Console.ReadLine();
        }
    }
}