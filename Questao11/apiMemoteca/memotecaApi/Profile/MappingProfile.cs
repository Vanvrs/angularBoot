/*using AutoMapper;
using PensamentosApi.Domain;
using PensamentosAPI.Dto;

namespace PensamentosAPI
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<PensamentoDto, Pensamento>()
                .ForMember(dest => dest.PensamentoDoAutor, opt => opt.MapFrom(src => src.Conteudo))
                .ForMember(dest => dest.NomeAutor, opt => opt.MapFrom(src => src.Autoria))
                .ForMember(dest => dest.Modelo, opt => opt.MapFrom(src => int.Parse(src.Modelo.Replace("modelo", ""))));

            
           
        }
    }
}
*/