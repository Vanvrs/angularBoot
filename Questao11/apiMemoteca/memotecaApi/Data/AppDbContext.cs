using Microsoft.EntityFrameworkCore;
using PensamentosApi.Domain;
namespace PensamentosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pensamento> Pensamentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pensamento>(entity =>
            {
                entity.ToTable("Pensamento");
                entity.Property(p => p.Id).HasColumnName("Id");
                entity.Property(p => p.PensamentoDoAutor).HasColumnName("PensamentoDoAutor").IsRequired();
                entity.Property(p => p.NomeAutor).HasColumnName("NomeAutor").IsRequired();
                entity.Property(p => p.Modelo).HasColumnName("Modelo").IsRequired();
            });
        }
    }
}