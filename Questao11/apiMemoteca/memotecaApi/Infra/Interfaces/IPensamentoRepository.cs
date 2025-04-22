

using PensamentosApi.Domain;

namespace PensamentosAPI.Infrastructure.Interfaces
{
    public interface IPensamentoRepository
    {
        Task<RetornoPaginado<Pensamento>> ListarPaginadoAsync(int pagina, int itensPorPagina);
        Task<List<Pensamento>> ListarTodosAsync();
        Task<Pensamento> ObterPorIdAsync(int id);
        Task<bool> InserirAsync(Pensamento pensamento);
        Task<bool> AtualizarAsync(Pensamento pensamento);
        Task<bool> ExcluirAsync(int id);
    }
}