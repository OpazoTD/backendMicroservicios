# Test de API - Microservicios E-commerce

# Configuración
$baseUrl = "http://localhost:3000"

Write-Host "=== PRUEBAS DE MICROSERVICIOS E-COMMERCE ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1. Health Check del Gateway..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl" -Method Get
    Write-Host "✓ Gateway funcionando: $response" -ForegroundColor Green
} catch {
    Write-Host "✗ Error en Gateway: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Crear Usuario
Write-Host "2. Creando usuario de prueba..." -ForegroundColor Yellow
$newUser = @{
    email = "test@example.com"
    password = "password123"
    name = "Usuario Test"
    role = "USER"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Method Post -Body $newUser -ContentType "application/json"
    Write-Host "✓ Usuario creado exitosamente:" -ForegroundColor Green
    Write-Host "  ID: $($response.id)" -ForegroundColor White
    Write-Host "  Email: $($response.email)" -ForegroundColor White
    Write-Host "  Nombre: $($response.name)" -ForegroundColor White
    $userId = $response.id
} catch {
    Write-Host "✗ Error al crear usuario:" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "  Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 3: Obtener todos los usuarios
Write-Host "3. Obteniendo lista de usuarios..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Method Get
    Write-Host "✓ Usuarios obtenidos: $($response.Count)" -ForegroundColor Green
    $response | ForEach-Object {
        Write-Host "  - ID: $($_.id), Email: $($_.email), Nombre: $($_.name)" -ForegroundColor White
    }
} catch {
    Write-Host "✗ Error al obtener usuarios: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Crear Producto
Write-Host "4. Creando producto de prueba..." -ForegroundColor Yellow
$newProduct = @{
    name = "Laptop Gaming"
    price = 1299.99
    stock = 25
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/products" -Method Post -Body $newProduct -ContentType "application/json"
    Write-Host "✓ Producto creado exitosamente:" -ForegroundColor Green
    Write-Host "  ID: $($response.id)" -ForegroundColor White
    Write-Host "  Nombre: $($response.name)" -ForegroundColor White
    Write-Host "  Precio: `$$($response.price)" -ForegroundColor White
    Write-Host "  Stock: $($response.stock)" -ForegroundColor White
    $productId = $response.id
} catch {
    Write-Host "✗ Error al crear producto:" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Obtener todos los productos
Write-Host "5. Obteniendo lista de productos..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/products" -Method Get
    Write-Host "✓ Productos obtenidos: $($response.Count)" -ForegroundColor Green
    $response | ForEach-Object {
        Write-Host "  - ID: $($_.id), Nombre: $($_.name), Precio: `$$($_.price), Stock: $($_.stock)" -ForegroundColor White
    }
} catch {
    Write-Host "✗ Error al obtener productos: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: Login
Write-Host "6. Probando login..." -ForegroundColor Yellow
$loginData = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginData -ContentType "application/json"
    Write-Host "✓ Login exitoso:" -ForegroundColor Green
    Write-Host "  Token: $($response.access_token.Substring(0, 50))..." -ForegroundColor White
    Write-Host "  Usuario ID: $($response.user.id)" -ForegroundColor White
} catch {
    Write-Host "✗ Error en login:" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== PRUEBAS COMPLETADAS ===" -ForegroundColor Cyan
