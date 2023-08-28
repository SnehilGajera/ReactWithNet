using System.ComponentModel.DataAnnotations;

namespace API.Model
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public int IsActive { get; set; }
    }
}
