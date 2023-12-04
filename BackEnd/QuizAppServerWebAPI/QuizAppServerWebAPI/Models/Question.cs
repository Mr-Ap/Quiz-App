using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAppServerWebAPI.Models
{
    public class Question
    {
        [Key]
        public int QnId { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(250)")]
        public string QnInWords { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? ImageName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option1 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option2 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option3 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option4 { get; set; }

        [Range(1,4,ErrorMessage ="Enter Valid Answer Index")]
        public int Answer { get; set; }

    }
}
