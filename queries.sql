-- SELECT posts.id, url, name FROM posts
-- INNER JOIN users
-- ON users.id = posts.user_id;

-- all the tags for a certain post
-- SELECT posts.id, url, tag FROM posts
-- 	LEFT JOIN tags_posts
--     	ON posts.id = tags_posts.post_id
--     LEFT JOIN tags
--     	ON tags.id = tags_posts.tag_id;

-- count how many likes a post has
-- SELECT count(*) FROM likes
-- 	WHERE post_id = 2;
    
-- get all of the posts and their likes
-- SELECT count(user_id) as num_likes, post_id FROM likes
-- 	GROUP BY post_id
--     ORDER BY num_likes DESC;

-- UPDATE comments SET comment = 'Cute!'
-- 	WHERE id = 6;

-- DELETE FROM posts WHERE id = 4;

-- DELETE FROM users;

-- MEDIUM EXERCISES: 
--1. What user made the most comments? How many?
-- SELECT name, COUNT(user_id) as number_comments FROM users
--  	INNER JOIN comments
--      	ON users.id = comments.user_id
--             GROUP BY name
--             LIMIT 1;

--2. Which Post had the most Comments? Which one had the least?
--MOST
--  SELECT url, COUNT(post_id) as comments FROM posts
 	-- INNER JOIN comments
    --  	ON posts.id = comments.post_id
    --      	GROUP BY url
	-- 		ORDER BY comments DESC
    --         LIMIT 1;

-- SELECT url, COUNT(post_id) as comments FROM posts
-- 	INNER JOIN comments
--     	ON posts.id = comments.post_id
--         	GROUP BY url
--             ORDER BY comments ASC
--             LIMIT 1;

--3. Write a single query to get all of the Posts and their Comments. 
--(You will see the same Post repeated in the results.)
-- SELECT url as post_name, comment, name FROM posts
-- 	INNER JOIN comments
--     	ON posts.id = comments.post_id
--     INNER JOIN users
--     	ON users.id = comments.user_id
--         	ORDER BY post_name;