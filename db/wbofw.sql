# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 192.168.80.6 (MySQL 5.0.75-0ubuntu10)
# Database: wbofw
# Generation Time: 2013-11-21 15:11:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table actions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `actions`;

CREATE TABLE `actions` (
  `module_id` varchar(80) NOT NULL default '',
  `action_id` varchar(255) NOT NULL default '',
  `option` varchar(80) default NULL,
  `action` varchar(80) default NULL,
  `description` text,
  `log` int(11) NOT NULL default '0',
  PRIMARY KEY  (`module_id`,`action_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;

INSERT INTO `actions` (`module_id`, `action_id`, `option`, `action`, `description`, `log`)
VALUES
	('wbofw-logeduserinfo','logeduserinfo_savePassword','logeduserinfo','savePassword','Update password user yang sedang login',0),
	('wbofw-logeduserinfo','logeduserinfo_save','logeduserinfo','save','Simpan keterangan user yang sedang login',0),
	('wbofw-logeduserinfo','logeduserinfo_getLoged','logeduserinfo','getLoged','Tampilkan keterangan user yang sedang login',0),
	('wbofw-userinfo','userinfo_save','userinfo','save','Simpan keterangan user',0),
	('wbofw-userotoritas','userotoritas_list','userotoritas','list','Lihat Data otoritas user',0),
	('wbofw-userotoritas','userotoritas_add','userotoritas','add','Tambah Data otoritas user',0),
	('wbofw-userotoritas','userotoritas_edit','userotoritas','edit','Ubah Data otoritas user',0),
	('wbofw-userotoritas','userotoritas_del','userotoritas','del','Hapus Data otoritas user',0),
	('wbofw-userotoritas','userotoritas_export','userotoritas','export','Export Data otoritas user',0),
	('wbofw-userotoritas','userotoritas_print','userotoritas','print','Cetak Data otoritas user',0),
	('wbofw-userotoritas','userotoritas_listUserGroup','userotoritas','listUserGroup','Melihat Daftar User',0),
	('wbofw-userotoritas','userotoritas_save','userotoritas','save','Menyimpan Data otoritas user',1),
	('wbofw-userinfo','userinfo_getDataUser','userinfo','getDataUser','Tampilkan keterangan user',0);

/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table group_has_actions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_has_actions`;

CREATE TABLE `group_has_actions` (
  `id` int(11) NOT NULL auto_increment,
  `group_id` varchar(100) default NULL,
  `module_id` varchar(100) default NULL,
  `action_id` varchar(100) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `group_has_actions` WRITE;
/*!40000 ALTER TABLE `group_has_actions` DISABLE KEYS */;

INSERT INTO `group_has_actions` (`id`, `group_id`, `module_id`, `action_id`)
VALUES
	(2570,'admin','wbofw-userotoritas','userotoritas_print'),
	(2571,'admin','wbofw-userotoritas','userotoritas_save'),
	(2569,'admin','wbofw-userotoritas','userotoritas_listUserGroup'),
	(2568,'admin','wbofw-userotoritas','userotoritas_list'),
	(2567,'admin','wbofw-userotoritas','userotoritas_export'),
	(2566,'admin','wbofw-userotoritas','userotoritas_edit'),
	(2565,'admin','wbofw-userotoritas','userotoritas_del'),
	(2564,'admin','wbofw-userotoritas','userotoritas_add'),
	(2563,'admin','wbofw-userinfo','userinfo_save'),
	(2562,'admin','wbofw-userinfo','userinfo_getDataUser'),
	(2543,'admin','wbofw-logeduserinfo','logeduserinfo_savePassword'),
	(2542,'admin','wbofw-logeduserinfo','logeduserinfo_save'),
	(2541,'admin','wbofw-logeduserinfo','logeduserinfo_getLoged');

/*!40000 ALTER TABLE `group_has_actions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table group_has_modules
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_has_modules`;

CREATE TABLE `group_has_modules` (
  `id` int(11) NOT NULL auto_increment,
  `group_id` varchar(100) default NULL,
  `module_id` varchar(100) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `group_has_modules` WRITE;
/*!40000 ALTER TABLE `group_has_modules` DISABLE KEYS */;

INSERT INTO `group_has_modules` (`id`, `group_id`, `module_id`)
VALUES
	(1189,'admin','wbofw-userotoritas'),
	(1188,'admin','wbofw-userinfo'),
	(1182,'admin','wbofw-logeduserinfo');

/*!40000 ALTER TABLE `group_has_modules` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table group_has_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_has_users`;

CREATE TABLE `group_has_users` (
  `id` int(11) NOT NULL auto_increment,
  `group_id` varchar(50) default NULL,
  `user_id` varchar(100) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `group_has_users` WRITE;
/*!40000 ALTER TABLE `group_has_users` DISABLE KEYS */;

INSERT INTO `group_has_users` (`id`, `group_id`, `user_id`)
VALUES
	(1,'admin','admin'),
	(5,'operator','demo');

/*!40000 ALTER TABLE `group_has_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` int(11) NOT NULL auto_increment,
  `group_id` varchar(50) default NULL,
  `description` varchar(150) default NULL,
  `active` tinyint(1) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`id`, `group_id`, `description`, `active`)
VALUES
	(1,'admin','Group Administrator',1),
	(2,'operator','Group Operator',1);

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table log_activity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log_activity`;

CREATE TABLE `log_activity` (
  `session_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `date` datetime default NULL,
  `module` varchar(255) default NULL,
  `action` varchar(255) default NULL,
  `status` varchar(255) default NULL,
  `data` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table modules
# ------------------------------------------------------------

DROP TABLE IF EXISTS `modules`;

CREATE TABLE `modules` (
  `module_id` varchar(80) NOT NULL,
  `module` varchar(45) default NULL,
  `name` varchar(45) default NULL,
  `description` text NOT NULL,
  `menu` varchar(255) NOT NULL,
  `iconcls` varchar(45) default NULL,
  `icon` varchar(255) default NULL,
  `active` int(11) NOT NULL default '1',
  `onmenu` int(10) default '1',
  `onview` varchar(50) NOT NULL default 'tabpanel',
  PRIMARY KEY  (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;

INSERT INTO `modules` (`module_id`, `module`, `name`, `description`, `menu`, `iconcls`, `icon`, `active`, `onmenu`, `onview`)
VALUES
	('wbofw-userotoritas','UserOtoritas','User Otoritas','Module pengolahan data otoritas user','Administration/','icon-module','icon.png',1,1,'tabpanel'),
	('wbofw-userinfo','UserInfo','Informasi User','Module pengolahan data user','Administration/','icon-module','icon.png',1,0,'window'),
	('wbofw-logeduserinfo','LogedUserInfo','Informasi User Yang Login','Module pengolahan data user','Administration/','icon-module','icon.png',1,0,'window');

/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table queryku
# ------------------------------------------------------------

DROP TABLE IF EXISTS `queryku`;

CREATE TABLE `queryku` (
  `id_query` bigint(20) NOT NULL auto_increment,
  `qry` text,
  `keterangan` text,
  PRIMARY KEY  (`id_query`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL default '' COMMENT 'a session : randomly generated id',
  `user_id` varchar(100) NOT NULL default '0' COMMENT 'user signed in',
  `group_id` int(11) unsigned default NULL COMMENT 'Group the member signed in under',
  `data` text,
  `ip_address` varchar(50) default NULL,
  `user_agent` varchar(150) default NULL,
  `time_login` datetime default NULL,
  `time_updated` datetime default NULL,
  `time_logout` datetime default NULL,
  `logout_status` varchar(50) default NULL,
  PRIMARY KEY  (`session_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table user_has_actions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_has_actions`;

CREATE TABLE `user_has_actions` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` varchar(100) default NULL,
  `module_id` varchar(100) default NULL,
  `action_id` varchar(100) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `user_has_actions` WRITE;
/*!40000 ALTER TABLE `user_has_actions` DISABLE KEYS */;

INSERT INTO `user_has_actions` (`id`, `user_id`, `module_id`, `action_id`)
VALUES
	(4,'admin','wbofw-logeduserinfo','logeduserinfo_getLoged'),
	(5,'admin','wbofw-logeduserinfo','logeduserinfo_save'),
	(6,'admin','wbofw-logeduserinfo','logeduserinfo_savePassword'),
	(23,'admin','wbofw-userinfo','userinfo_getDataUser'),
	(24,'admin','wbofw-userinfo','userinfo_save'),
	(25,'admin','wbofw-userotoritas','userotoritas_add'),
	(26,'admin','wbofw-userotoritas','userotoritas_del'),
	(27,'admin','wbofw-userotoritas','userotoritas_edit'),
	(28,'admin','wbofw-userotoritas','userotoritas_export'),
	(29,'admin','wbofw-userotoritas','userotoritas_list'),
	(30,'admin','wbofw-userotoritas','userotoritas_listUserGroup'),
	(31,'admin','wbofw-userotoritas','userotoritas_print'),
	(32,'admin','wbofw-userotoritas','userotoritas_save');

/*!40000 ALTER TABLE `user_has_actions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_has_modules
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_has_modules`;

CREATE TABLE `user_has_modules` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` varchar(100) default NULL,
  `module_id` varchar(100) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `user_has_modules` WRITE;
/*!40000 ALTER TABLE `user_has_modules` DISABLE KEYS */;

INSERT INTO `user_has_modules` (`id`, `user_id`, `module_id`)
VALUES
	(4,'admin','wbofw-logeduserinfo'),
	(12,'admin','wbofw-userinfo'),
	(13,'admin','wbofw-userotoritas');

/*!40000 ALTER TABLE `user_has_modules` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` varchar(200) character set utf8 collate utf8_unicode_ci NOT NULL,
  `username` varchar(200) character set utf8 collate utf8_unicode_ci NOT NULL,
  `password` varchar(200) character set utf8 collate utf8_unicode_ci NOT NULL,
  `nama` varchar(100) default NULL,
  `email` varchar(254) character set utf8 collate utf8_unicode_ci default NULL,
  `level_id` int(11) default NULL,
  `level_name` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `wallPaper` varchar(45) character set utf8 collate utf8_unicode_ci default 'Desk',
  `theme` varchar(45) character set utf8 collate utf8_unicode_ci default 'blue',
  `wpStretch` tinyint(1) default NULL,
  `active` tinyint(1) default NULL,
  `param01` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param02` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param03` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param04` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param05` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param06` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param07` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param08` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param09` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `param10` varchar(255) character set utf8 collate utf8_unicode_ci default NULL,
  `isadmin` int(10) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `user_id`, `username`, `password`, `nama`, `email`, `level_id`, `level_name`, `wallPaper`, `theme`, `wpStretch`, `active`, `param01`, `param02`, `param03`, `param04`, `param05`, `param06`, `param07`, `param08`, `param09`, `param10`, `isadmin`)
VALUES
	(1,'admin','admin','18c6d818ae35a3e8279b5330eda01498','Administrator','',1,'','','',0,1,'Wimbo','34','4','','','','','Karepku','MARYANTO','KARDIYONO',1),
	(6,'demo','demo','fe01ce2a7fbac8fafaed7c982a04e229','User Demo','demo@demo.com',0,'Nol','','',0,1,'','','','','','','','','','',0);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
