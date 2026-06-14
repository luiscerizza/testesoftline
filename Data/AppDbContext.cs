using Microsoft.EntityFrameworkCore;
using testesoftline.Models;

namespace testesoftline.Data
{
    public class AppDbContext : DbContext
    {
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
      {
      }
        public DbSet<Usuario> Usuarios { get; set; } = null!;
         public DbSet<Cliente> Clientes { get; set; } = null!;
         public DbSet<Produto> Produtos { get; set; } = null!;
    }
}
