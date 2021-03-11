-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 10 mars 2021 à 19:28
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tindquette`
--

-- --------------------------------------------------------

--
-- Structure de la table `disquette`
--

DROP TABLE IF EXISTS `disquette`;
CREATE TABLE IF NOT EXISTS `disquette` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `idAutor` int(11) NOT NULL,
  `isValid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idAutor` (`idAutor`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `disquette`
--

INSERT INTO `disquette` (`id`, `content`, `idAutor`, `isValid`) VALUES
(58, 'Lorem Ipsum', 26, 1),
(59, 'lorem ipsum ', 26, 1),
(60, 'lorem ipsum ipsum ', 26, 1),
(61, 'lorem ipsuma ', 26, 1),
(62, 'lorem gergrge ', 26, 1),
(63, 'lorem ipsum ispsum ipsum ispsum ipsum ispsum', 26, 1),
(64, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(65, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(66, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(67, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(68, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(69, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(70, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(71, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(72, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(73, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(74, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(75, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(76, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(77, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1),
(78, 'lorem ipsum ispsum ipsum ispsum ipsum ispsumipsum ispsumipsum ispsipsum ', 26, 1);

-- --------------------------------------------------------

--
-- Structure de la table `favori`
--

DROP TABLE IF EXISTS `favori`;
CREATE TABLE IF NOT EXISTS `favori` (
  `idUser` int(11) NOT NULL,
  `idDisquette` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idDisquette`),
  KEY `idDisquette` (`idDisquette`) USING BTREE,
  KEY `idUser` (`idUser`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `favori`
--

INSERT INTO `favori` (`idUser`, `idDisquette`) VALUES
(27, 58);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` text NOT NULL,
  `pseudo` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `mail`, `pseudo`, `password`, `isAdmin`) VALUES
(26, 'jean@gmail.com', 'jean', 'sha1$68dda868$1$a1c45df657a3a10a6672ed887166c8ba5126601a', 0),
(27, 'georges@gmail.com', 'georges', 'sha1$6ae322c8$1$f84a71fe8fc3dcf255a7818cc4f1bec8f1143692', 0),
(28, 'michel@gmail.com', 'michel', 'sha1$fa38b029$1$4189dadbb6ece0091c8a49c804f2a97e554576ba', 0),
(30, 'martine@gmail.com', 'martine', 'sha1$251136ed$1$41d174648da58a82ffdfc11f130edd31cdd2e643', 0),
(31, 'philipe@gmail.com', 'philipe', 'sha1$dba304c6$1$fdb6b992fa35195e2bf1fbf92e9b988bca7c1d92', 1),
(32, 'thomas@gmail.com', 'thomas', 'sha1$a7af9764$1$031de2210ecdbf900959f6f652a66fb84b5a3721', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `disquette`
--
ALTER TABLE `disquette`
  ADD CONSTRAINT `disquette_ibfk_1` FOREIGN KEY (`idAutor`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `favori`
--
ALTER TABLE `favori`
  ADD CONSTRAINT `favori_ibfk_1` FOREIGN KEY (`idDisquette`) REFERENCES `disquette` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favori_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
