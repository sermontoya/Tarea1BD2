use AdventureWorks2022;
GO

create procedure agregarTarjeta @tipoTarjeta nvarchar(50), @NumeroTarjeta nvarchar(25),
@MesExpiracion tinyint, @AnioExpiracion smallint
AS
INSERT INTO Sales.CreditCard VALUES (@tipoTarjeta, @NumeroTarjeta, @MesExpiracion, @AnioExpiracion, GETDATE())
GO

create procedure actualizarTarjeta @NumeroTarjeta nvarchar(25), @MesExpiracion tinyint, @AnioExpiracion smallint
as
UPDATE Sales.CreditCard set ExpMonth= @MesExpiracion, ExpYear=@AnioExpiracion where CardNumber=@NumeroTarjeta
GO

create procedure eliminarTarjeta @NumeroTarjeta nvarchar(25)
as 
DELETE from Sales.CreditCard where CardNumber = @NumeroTarjeta
GO

create procedure mostrarTarjetas 
as
Select CardNumber as NumeroTarjeta, CardType as TipoTarjeta, 
(CAST(ExpMonth as varchar(10))+ '-' + CAST(ExpYear as varchar(10))) as FechaExpiracion from Sales.CreditCard
GO

create procedure mostrarTarjetasTipo @TipoTarjeta nvarchar(50)
as
Select CardNumber as NumeroTarjeta, CardType as TipoTarjeta, 
(CAST(ExpMonth as varchar(10))+ '-' + CAST(ExpYear as varchar(10))) as FechaExpiracion from Sales.CreditCard
where CardType = @TipoTarjeta
GO

create procedure mostrarTarjetasMesAnioExpiracion @Mes tinyint, @Anio smallint
as
Select CardNumber as NumeroTarjeta, CardType as TipoTarjeta, 
(CAST(ExpMonth as varchar(10))+ '-' + CAST(ExpYear as varchar(10))) as FechaExpiracion from Sales.CreditCard
where ExpMonth= @Mes and ExpYear=@Anio
GO

create procedure mostrarTarjetasRangoFechasExpiracion @MesInicio tinyint, @AnioInicio smallint, @MesFin tinyint, @AnioFin smallint
as
Select CardNumber as NumeroTarjeta, CardType as TipoTarjeta, 
(CAST(ExpMonth as varchar(10))+ '-' + CAST(ExpYear as varchar(10))) as FechaExpiracion from Sales.CreditCard
where 
   (ExpYear > @AnioInicio or (ExpYear = @AnioInicio and ExpMonth >= @MesInicio)) and
   (ExpYear < @AnioFin or (ExpYear = @AnioFin and ExpMonth <= @MesFin))
GO