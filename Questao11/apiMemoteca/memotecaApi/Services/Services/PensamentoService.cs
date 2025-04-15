using PensamentosApi.Domain;
using PensamentosAPI.Infrastructure.Interfaces;
using PensamentosAPI.Services.Interfaces;


namespace PensamentosAPI.Services
{
    public class PensamentoService : IPensamentoService
    {
        private readonly IPensamentoRepository _repository;

        public PensamentoService(IPensamentoRepository repository)
        {
            _repository = repository;
        }

        public async Task<RetornoPaginado<Pensamento>> ListarPaginadoAsync(int pagina, int itensPorPagina)
        {
            return await _repository.ListarPaginadoAsync(pagina, itensPorPagina);
        }

        public async Task<List<Pensamento>> ListarTodosAsync()
        {
            return await _repository.ListarTodosAsync();
        }

        public async Task<Pensamento> ObterPorIdAsync(int id)
        {
            return await _repository.ObterPorIdAsync(id);
        }

        public async Task<bool> InserirAsync(Pensamento pensamento)
        {
            return await _repository.InserirAsync(pensamento);
        }

        public async Task<bool> AtualizarAsync(Pensamento pensamento)
        {
            return await _repository.AtualizarAsync(pensamento);
        }

        public async Task<bool> ExcluirAsync(int id)
        {
            return await _repository.ExcluirAsync(id);
        }

        public Task<RetornoPaginado<Pensamento>> ListarPaginadoAsync(int pagina, int itensPorPagina, string filtro)
        {
            throw new NotImplementedException();
        }
    }
}