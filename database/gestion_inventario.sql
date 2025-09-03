-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 03-09-2025 a las 20:35:21
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
-- Base de datos: `gestion_inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id_articulo` int(15) NOT NULL,
  `nombre_articulo` varchar(50) NOT NULL,
  `precio_articulo` int(15) NOT NULL,
  `marca_articulo` varchar(30) NOT NULL,
  `categoria_articulo` varchar(30) NOT NULL,
  `descripcion_articulo` varchar(50) NOT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo_factura`
--

CREATE TABLE `articulo_factura` (
  `id_articulo_factura` int(15) NOT NULL,
  `id_articulo` int(15) NOT NULL,
  `id_factura` int(15) NOT NULL,
  `subtotal` int(20) NOT NULL,
  `cantidad_articulos` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajero`
--

CREATE TABLE `cajero` (
  `id_cajero` int(15) NOT NULL,
  `nombre_cajero` varchar(50) NOT NULL,
  `telefono_cajero` int(15) NOT NULL,
  `correo_cajero` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(15) NOT NULL,
  `nombre_cliente` varchar(50) NOT NULL,
  `telefono_cliente` int(15) NOT NULL,
  `correo_cliente` varchar(50) NOT NULL,
  `direccion_cliente` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_factura` int(11) NOT NULL,
  `id_cajero` int(15) NOT NULL,
  `id_cliente` int(15) NOT NULL,
  `fecha_factura` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `impuestos` int(20) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `total` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(15) NOT NULL,
  `nombre_proveedor` varchar(50) NOT NULL,
  `tel_proveedor` int(15) NOT NULL,
  `correo_proveedor` varchar(50) NOT NULL,
  `direccion_proveedor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_articulo`
--

CREATE TABLE `proveedor_articulo` (
  `id_proveedor_articulo` int(15) NOT NULL,
  `id_proveedor` int(15) NOT NULL,
  `id_articulo` int(15) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad_suministrada` int(20) NOT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id_articulo`);

--
-- Indices de la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  ADD PRIMARY KEY (`id_articulo_factura`),
  ADD KEY `id_factura` (`id_factura`),
  ADD KEY `articulo_factura_ibfk_2` (`id_articulo`);

--
-- Indices de la tabla `cajero`
--
ALTER TABLE `cajero`
  ADD PRIMARY KEY (`id_cajero`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_cajero` (`id_cajero`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `proveedor_articulo`
--
ALTER TABLE `proveedor_articulo`
  ADD PRIMARY KEY (`id_proveedor_articulo`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `proveedor_articulo_ibfk_2` (`id_articulo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  MODIFY `id_articulo_factura` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor_articulo`
--
ALTER TABLE `proveedor_articulo`
  MODIFY `id_proveedor_articulo` int(15) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  ADD CONSTRAINT `articulo_factura_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`),
  ADD CONSTRAINT `articulo_factura_ibfk_2` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id_articulo`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`id_cajero`) REFERENCES `cajero` (`id_cajero`);

--
-- Filtros para la tabla `proveedor_articulo`
--
ALTER TABLE `proveedor_articulo`
  ADD CONSTRAINT `proveedor_articulo_ibfk_2` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id_articulo`),
  ADD CONSTRAINT `proveedor_articulo_ibfk_3` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
