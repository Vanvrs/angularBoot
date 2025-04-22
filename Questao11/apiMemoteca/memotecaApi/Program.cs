
using memotecaApi.Infra.Repositories;
using Microsoft.EntityFrameworkCore;
using PensamentosAPI.Data;
using PensamentosAPI.Infrastructure.Interfaces;
using PensamentosAPI.Services;
using PensamentosAPI.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

//configurar appsetting.Development
// Adicione isso antes de var app = builder.Build();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy( policy =>
    {
    policy.WithOrigins("http://localhost:4200")
       .AllowAnyMethod()
       .AllowAnyHeader();
});
       
});



// Adicionar serviços.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro das dependências
builder.Services.AddScoped<IPensamentoRepository, PensamentoRepository>();
builder.Services.AddScoped<IPensamentoService, PensamentoService>();


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

//Conf cors
if (app.Environment.IsDevelopment())
{
    app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true)
        .AllowCredentials());
}
app.UseHttpsRedirection();
app.UseRouting();

app.UseCors();//aqui para conitnuar configurando com front

app.UseAuthorization();
app.MapControllers();

app.Run();

