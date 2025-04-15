/*using AutoMapper;
using PensamentosApi.Domain;
using PensamentosAPI.Dto;

namespace PensamentosAPI
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pensamento, PensamentoDto>()
                .ForMember(dest => dest.Conteudo, opt => opt.MapFrom(src => src.PensamentoDoAutor))
                .ForMember(dest => dest.Autoria, opt => opt.MapFrom(src => src.NomeAutor))
                .ForMember(dest => dest.Modelo, opt => opt.MapFrom(src => $"modelo{src.Modelo}"));

            CreateMap<PensamentoDto, Pensamento>()
                .ForMember(dest => dest.PensamentoDoAutor, opt => opt.MapFrom(src => src.Conteudo))
                .ForMember(dest => dest.NomeAutor, opt => opt.MapFrom(src => src.Autoria))
                .ForMember(dest => dest.Modelo, opt => opt.MapFrom(src => int.Parse(src.Modelo.Replace("modelo", ""))));

            CreateMap<PensamentoInsercaoDto, Pensamento>()
            .ForMember(dest => dest.Modelo, opt => opt.MapFrom(src => src.Modelo)); // Já é int
           
        }
    }
}
*/