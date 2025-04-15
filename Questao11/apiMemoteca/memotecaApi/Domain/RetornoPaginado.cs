namespace PensamentosApi.Domain
{
    public class RetornoPaginado<T>
    {
        public int TotalItens { get; set; }
        public int PaginaAtual { get; set; }
        public int ItensPorPagina { get; set; }
        public List<T> Itens { get; set; }
    }
}