/*using memotecaApi.Infra.Repositories;
using Microsoft.EntityFrameworkCore;
using PensamentosAPI.Data;
using PensamentosAPI.Infrastructure.Interfaces;
using PensamentosAPI.Services;
using PensamentosAPI.Services.Interfaces;


var builder = WebApplication.CreateBuilder(args);

//Adicione CORS ANTES de Build()
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro das dependências
builder.Services.AddScoped<IPensamentoRepository, PensamentoRepository>();
builder.Services.AddScoped<IPensamentoService, PensamentoService>();

builder.Services.AddControllers();

// Configuração do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Memoteca API", Version = "v1" });
});

var app = builder.Build();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Memoteca API v1");
        c.RoutePrefix = string.Empty; // Isso faz o Swagger UI aparecer na raiz
    });
}

app.UseCors("AllowAngular"); //antes de UseHttpsRedirection()
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();*/
using AutoMapper;
using memotecaApi.Infra.Repositories;
using Microsoft.EntityFrameworkCore;
using PensamentosAPI;
using PensamentosAPI.Data;
using PensamentosAPI.Infrastructure.Interfaces;
using PensamentosAPI.Services;
using PensamentosAPI.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
;
//configurar appsetting.Development
/*var allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins")!.Split(",");
// Configuração do CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("allowedOrigins") // URL do seu frontend Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});*/

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro das dependências
builder.Services.AddScoped<IPensamentoRepository, PensamentoRepository>();
builder.Services.AddScoped<IPensamentoService, PensamentoService>();




// Configuração  do AutoMapper
/*var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
*/
// Configuração do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Memoteca API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
;
}


app.UseHttpsRedirection();
//app.UseCors();//aqui para conitnuar configurando com front
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();