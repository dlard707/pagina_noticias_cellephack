-- CREATE TABLE noticias(
--     id_noticia SERIAL PRIMARY KEY,
--     titulo VARCHAR(100) NOT NULL,
--     conteudo TEXT NOT NULL,
--     data_criacao TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc+3')
-- )

-- INSERT INTO noticias(
--     titulo,
--     conteudo
-- ) VALUES (
--     'Noticia de internacional',
--     'O professor David vai dar aula desde a estação internacional'
-- )

--Selecionar 
-- SELECT * FROM noticias;

--Filtrar colunas

-- SELECT titulo, data_criacao FROM noticias;

-- Filtrar registros com base no valor de colunas
-- SELECT * FROM noticias WHERE id_noticia = 3;

--Ordenar os registros selecionados
-- SELECT * FROM noticias ORDER BY id_noticia DESC;
-- SELECT * FROM noticias ORDER BY id_noticia ASC;

--Atualizar registros
-- UPDATE noticias SET titulo = 'Noticia sem graça' WHERE id_noticia = 1;

-- SELECT * FROM noticias;


--Deletar registros

-- DELETE FROM noticias WHERE id_noticia = 1;