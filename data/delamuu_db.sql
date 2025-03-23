-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2025 a las 02:44:19
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_order` (IN `p_nombre_cliente` VARCHAR(100), IN `p_direccion` VARCHAR(255), IN `p_detalles` JSON, IN `p_total` DECIMAL(10,2))   BEGIN
    INSERT INTO orders (nombre_cliente, direccion, detalles, total)
    VALUES (p_nombre_cliente, p_direccion, p_detalles, p_total);
END$$

DELIMITER ;

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
(2, '1/2 kg'),
(3, '3/4 kg'),
(4, '1 kg'),
(5, '1/4 kg');

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
(6, 2, 2, 22000.00),
(7, 3, 2, 32000.00),
(8, 4, 2, 42000.00),
(10, 2, 3, 25000.00),
(11, 3, 3, 35000.00),
(12, 4, 3, 45000.00),
(14, 2, 4, 28000.00),
(15, 3, 4, 38000.00),
(16, 4, 4, 48000.00);

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
(1, 'Ananá'),
(2, 'Arándanos'),
(3, 'Cerezas'),
(4, 'Durazno'),
(13, 'Ensalada de frutas'),
(5, 'Frutilla'),
(6, 'Frutos rojos'),
(7, 'Higo en almibar'),
(9, 'Melón'),
(10, 'Sandía'),
(11, 'Uva'),
(12, 'Zapallo en almíbar');

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
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `nombre_cliente`, `direccion`, `precio`, `fecha`, `detalles`, `total`) VALUES
(1, 'esta', '123', 0.00, '2025-03-22 07:58:08', '[{\"gramaje\":\"1/2 kg\",\"toppings\":[\"Chips Chocolate\"],\"salsas\":[],\"frutas\":[],\"precio\":20000}]', 20000.00),
(2, 'esta', '123', 0.00, '2025-03-22 08:00:42', '[{\"gramaje\":\"1/2 kg\",\"toppings\":[\"Chips Chocolate\"],\"salsas\":[],\"frutas\":[],\"precio\":20000}]', 20000.00),
(3, 'esta', '123', 0.00, '2025-03-23 00:15:49', '[{\"gramaje\":\"1 kg\",\"toppings\":[\"Chips Chocolate\",\"Bananitas\"],\"salsas\":[\"Dulce de leche\",\"Dulce de leche granizado\"],\"frutas\":[\"Durazno\"],\"precio\":40000}]', 40000.00);

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
(12, 'Bon o bon'),
(13, 'Brownie'),
(14, 'Choco & Naranja'),
(15, 'Chocolate blanco'),
(2, 'Chocotorta'),
(3, 'Cream de coco'),
(11, 'Crema oreo'),
(4, 'Dulce de leche'),
(5, 'Dulce de leche granizado'),
(6, 'Frutilla'),
(7, 'Frutos del bosque'),
(16, 'Gran fondente'),
(17, 'Kinder'),
(8, 'Leche condensada'),
(19, 'Maní crunch'),
(18, 'Mantequilla de maní'),
(10, 'Maracuyá'),
(20, 'Mentita felfort'),
(21, 'Miel'),
(9, 'Nutella'),
(22, 'Test');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- AUTO_INCREMENT de la tabla `envases`
--
ALTER TABLE `envases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `envases_productos`
--
ALTER TABLE `envases_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `frutas`
--
ALTER TABLE `frutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `salsas`
--
ALTER TABLE `salsas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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
