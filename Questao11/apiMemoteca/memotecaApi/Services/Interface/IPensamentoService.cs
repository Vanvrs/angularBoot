﻿using PensamentosApi.Domain;

namespace PensamentosAPI.Services.Interfaces
{
    public interface IPensamentoService
    {
        Task<RetornoPaginado<Pensamento>> ListarPaginadoAsync(int pagina, int itensPorPagina);
        Task<List<Pensamento>> ListarTodosAsync();
        Task<Pensamento> ObterPorIdAsync(int id);
        Task<bool> InserirAsync(Pensamento pensamento);
        Task<bool> AtualizarAsync(Pensamento pensamento);
        Task<bool> ExcluirAsync(int id);
    }
}


