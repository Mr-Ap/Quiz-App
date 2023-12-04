using Microsoft.EntityFrameworkCore;
using QuizAppServerWebAPI.Models;

namespace QuizAppServerWebAPI.Data
{
    public class QuizDbContext:DbContext
    {
        public QuizDbContext( DbContextOptions<QuizDbContext> options):base(options)
        {}
        public DbSet<Question> Questions { get; set; }
        public DbSet<Participant> Participants { get; set; }

    }
}
