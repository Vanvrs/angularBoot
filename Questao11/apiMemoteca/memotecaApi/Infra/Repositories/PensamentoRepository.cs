using Microsoft.EntityFrameworkCore;
using PensamentosApi.Domain;
using PensamentosAPI.Data;
using PensamentosAPI.Infrastructure.Interfaces;

namespace memotecaApi.Infra.Repositories
{
    public class PensamentoRepository : IPensamentoRepository
    {
        private readonly AppDbContext _context;

        public PensamentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<RetornoPaginado<Pensamento>> ListarPaginadoAsync(int pagina, int itensPorPagina)
        {
            var totalItens = await _context.Pensamentos.CountAsync();
            var pensamentos = await _context.Pensamentos
                .Skip((pagina - 1) * itensPorPagina)
                .Take(itensPorPagina)
                .ToListAsync();

            return new RetornoPaginado<Pensamento>
            {
                TotalItens = totalItens,
                PaginaAtual = pagina,
                ItensPorPagina = itensPorPagina,
                Itens = pensamentos
            };
        }

        public async Task<List<Pensamento>> ListarTodosAsync()
        {
            return await _context.Pensamentos.ToListAsync();
        }

        public async Task<Pensamento> ObterPorIdAsync(int id)
        {
            return await _context.Pensamentos.FindAsync(id);
        }

        public async Task<bool> InserirAsync(Pensamento pensamento)
        {
            await _context.Pensamentos.AddAsync(pensamento);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AtualizarAsync(Pensamento pensamento)
        {
            _context.Pensamentos.Update(pensamento);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ExcluirAsync(int id)
        {
            var pensamento = await _context.Pensamentos.FindAsync(id);
            if (pensamento == null) return false;

            _context.Pensamentos.Remove(pensamento);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}