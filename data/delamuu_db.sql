-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-03-2025 a las 06:54:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delamuu_db`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_order` (IN `p_nombre_cliente` VARCHAR(100), IN `p_direccion` VARCHAR(200), IN `p_detalles` TEXT, IN `p_total` DECIMAL(10,2), IN `p_forma_pago` VARCHAR(50), IN `p_forma_retiro` VARCHAR(50))   BEGIN
  INSERT INTO orders(nombre_cliente, direccion, detalles, total, forma_pago, forma_retiro)
  VALUES(p_nombre_cliente, p_direccion, p_detalles, p_total, p_forma_pago, p_forma_retiro);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delivery`
--

CREATE TABLE `delivery` (
  `delivery_price_id` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `delivery`
--

INSERT INTO `delivery` (`delivery_price_id`, `price`) VALUES
(1, 2000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envases`
--

CREATE TABLE `envases` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `envases`
--

INSERT INTO `envases` (`id`, `nombre`) VALUES
(12, '1/4 kg'),
(13, '1/2 kg'),
(14, '3/4 kg'),
(15, '1 kg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envases_productos`
--

CREATE TABLE `envases_productos` (
  `id` int(11) NOT NULL,
  `envase_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `envases_productos`
--

INSERT INTO `envases_productos` (`id`, `envase_id`, `producto_id`, `precio`) VALUES
(32, 12, 2, 5900.00),
(33, 12, 3, 7500.00),
(34, 12, 4, 8500.00),
(35, 12, 5, 6500.00),
(36, 13, 2, 10900.00),
(37, 13, 3, 12900.00),
(38, 13, 4, 15500.00),
(39, 13, 5, 11900.00),
(40, 14, 2, 14900.00),
(41, 14, 3, 0.00),
(42, 14, 4, 22900.00),
(43, 14, 5, 0.00),
(44, 15, 2, 18500.00),
(45, 15, 3, 17500.00),
(46, 15, 4, 28900.00),
(47, 15, 5, 15900.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frutas`
--

CREATE TABLE `frutas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `frutas`
--

INSERT INTO `frutas` (`id`, `nombre`) VALUES
(15, 'Ananá'),
(17, 'Arándanos'),
(18, 'Cerezas'),
(19, 'Durazno'),
(28, 'Ensalada de frutas'),
(20, 'Frutilla'),
(21, 'Frutos rojos'),
(22, 'Higos en almibar'),
(23, 'Kiwi'),
(24, 'Melón'),
(25, 'Sandía'),
(26, 'Uva'),
(27, 'Zapallo en almíbar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `detalles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`detalles`)),
  `total` decimal(10,2) NOT NULL,
  `forma_pago` varchar(50) DEFAULT NULL,
  `forma_retiro` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `nombre_cliente`, `direccion`, `precio`, `fecha`, `detalles`, `total`, `forma_pago`, `forma_retiro`) VALUES
(22, 'Estanis', 'Av123', 0.00, '2025-03-26 05:40:23', '[{\"product\":\"Yogur\",\"gramaje\":\"1/4 kg\",\"toppings\":[],\"salsas\":[],\"frutas\":[\"Zapallo en almíbar\",\"Uva\",\"Sandía\"],\"precio\":6500},{\"product\":\"Helado\",\"gramaje\":\"1/2 kg\",\"sabores\":[\"Almendrado\",\"Americana\",\"Ananá\"],\"precio\":10900},{\"product\":\"Azai\",\"gramaje\":\"3/4 kg\",\"toppings\":[\"Alfajor\",\"Almendras\",\"Almohaditas\",\"Anillitos\"],\"salsas\":[],\"frutas\":[],\"precio\":22900},{\"product\":\"Candy\",\"gramaje\":\"1 kg\",\"toppings\":[\"Pasas de uva con choco\",\"Ópera\",\"Moritas\"],\"salsas\":[\"Frutos del bosque\",\"Frutilla\"],\"frutas\":[],\"precio\":17500}]', 59800.00, 'Pago contraentrega', 'Entregar en domicilio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`) VALUES
(2, 'Helado'),
(3, 'Candy'),
(4, 'Azai'),
(5, 'Yogur');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sabores`
--

CREATE TABLE `sabores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sabores`
--

INSERT INTO `sabores` (`id`, `nombre`) VALUES
(5, 'Almendrado'),
(6, 'Americana'),
(7, 'Ananá'),
(8, 'Banana Split'),
(9, 'Bis-Choc'),
(10, 'Chocolate'),
(11, 'Chocolate al rhun'),
(12, 'Chocolate amargo'),
(13, 'Chocolate blanco'),
(14, 'Chocolate con almendras'),
(15, 'Chocolate selva negra'),
(16, 'Chocolate suizo'),
(17, 'Coco con dulce de leche'),
(18, 'Crema del cielo'),
(19, 'Crema oreo'),
(20, 'Cereza'),
(21, 'Dulce de leche'),
(22, 'Dulce de leche con nuez'),
(23, 'Dulce de leche granizado'),
(24, 'Durazno'),
(25, 'Flan'),
(26, 'Frutilla al agua'),
(27, 'Frutilla a la crema'),
(28, 'Frutos del bosque'),
(29, 'Granizado'),
(30, 'Kiwi'),
(31, 'Lemon Pie'),
(32, 'Limón'),
(33, 'Limón granizado'),
(34, 'Limón mediterráneo'),
(35, 'Mantecol'),
(36, 'Mascarpone'),
(37, 'Menta granizada'),
(38, 'Mousse de chocolate'),
(39, 'Nevado'),
(40, 'Naranja'),
(41, 'Panna cota'),
(42, 'Pistacho'),
(43, 'Rocher'),
(44, 'Súper Dulce de leche'),
(45, 'Súper sambayon'),
(46, 'Tiramisú'),
(47, 'Tramontana'),
(48, 'Vainilla'),
(49, 'Yogurt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salsas`
--

CREATE TABLE `salsas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salsas`
--

INSERT INTO `salsas` (`id`, `nombre`) VALUES
(23, 'Banana Split'),
(35, 'Bon o Bon (Caliente)'),
(36, 'Brownie (Caliente)'),
(37, 'Choco & Naranja (Caliente)'),
(38, 'Chocolate blanco (Caliente)'),
(25, 'Chocotorta'),
(26, 'Crema de coco'),
(34, 'Crema oreo'),
(27, 'Dulce de leche'),
(28, 'Dulce de leche granizado'),
(29, 'Frutilla'),
(30, 'Frutos del bosque'),
(39, 'Gran fondente (Caliente)'),
(40, 'Kinder (Caliente)'),
(31, 'Leche condensada'),
(42, 'Maní crunch (Caliente)'),
(41, 'Mantequilla de maní (Caliente)'),
(33, 'Maracuyá'),
(43, 'Mentita fort (Caliente)'),
(44, 'Miel (Caliente)'),
(32, 'Nutella');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `toppings`
--

INSERT INTO `toppings` (`id`, `nombre`) VALUES
(38, 'Alfajor'),
(39, 'Almendras'),
(40, 'Almohaditas'),
(41, 'Anillitos'),
(42, 'Bananitas'),
(43, 'Bon o Bon'),
(44, 'Cereal con chocolate'),
(45, 'Chips con chocolate'),
(46, 'Chocolinas'),
(47, 'Coco rallado'),
(48, 'Frutos secos'),
(49, 'Gomitas'),
(51, 'Granas multicolor'),
(50, 'Granola'),
(52, 'Leche en Polvo Nido'),
(53, 'Maní con chocolate'),
(54, 'Maní crocante'),
(55, 'Mantecol'),
(56, 'Marroc'),
(57, 'Merenguitos'),
(59, 'Micro cereales de color'),
(58, 'Mini galletitas con choco'),
(60, 'Moritas'),
(61, 'Ópera'),
(62, 'Oreo'),
(63, 'Pasas de uva con choco'),
(64, 'Pepitos'),
(65, 'Quinoa con chocolate'),
(66, 'Rocklets'),
(67, 'Zucarita');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(12) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `userName`, `password`) VALUES
(1, 'delamuu2025', 'delamuu2025');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`delivery_price_id`);

--
-- Indices de la tabla `envases`
--
ALTER TABLE `envases`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `envases_productos`
--
ALTER TABLE `envases_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `envase_id` (`envase_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `frutas`
--
ALTER TABLE `frutas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sabores`
--
ALTER TABLE `sabores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salsas`
--
ALTER TABLE `salsas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `toppings`
--
ALTER TABLE `toppings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `delivery`
--
ALTER TABLE `delivery`
  MODIFY `delivery_price_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `envases`
--
ALTER TABLE `envases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `envases_productos`
--
ALTER TABLE `envases_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `frutas`
--
ALTER TABLE `frutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sabores`
--
ALTER TABLE `sabores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `salsas`
--
ALTER TABLE `salsas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `envases_productos`
--
ALTER TABLE `envases_productos`
  ADD CONSTRAINT `envases_productos_ibfk_1` FOREIGN KEY (`envase_id`) REFERENCES `envases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `envases_productos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
