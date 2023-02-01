const express = require('express');
const Joi = require('joi');

const router = express();

let posts = [
	{ id: '1', topic: 'test topic', text: 'test text' },
	{ id: '2', topic: 'test topic2', text: 'test text2' },
	{ id: '3', topic3: 'test topic3', text: 'test text3' },
];

router.get('/', (req, res) => {
	res.json({ status: 'succes', posts });
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	const [post] = posts.filter((post) => post.id === id);

	if (!post) {
		return res.status(404).json({
			status: 'error',
			code: 404,
			message: `Post with ${id} not found`,
		});
	}

	res.json({ status: 'succes', post });
});

router.post('/', (req, res) => {
	const { topic, text } = req.body;

	const schema = Joi.object({
		topic: Joi.string().min(3).max(30).required(),
		text: Joi.string().min(10).max(400).required(),
	});

	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		return res.status(400).json({
			status: 'error',
			message: validationResult.error.details[0].message,
		});
	}

	posts.push({
		id: new Date().getTime().toString(),
		topic,
		text,
	});

	res.status(201).json({ status: 'succes' });
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { topic, text } = req.body;

	const schema = Joi.object({
		topic: Joi.string().min(3).max(30).optional(),
		text: Joi.string().min(10).max(400).optional(),
	});

	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		return res.status(400).json({
			status: 'error',
			message: validationResult.error.details[0].message,
		});
	}

	posts.forEach((post) => {
		if (post.id === id) {
			post.topic = topic;
			post.text = text;
		}
	});

	res.json({ status: 'succes' });
});

router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const { topic, text } = req.body;

	const schema = Joi.object({
		topic: Joi.string().min(3).max(30).optional(),
		text: Joi.string().min(10).max(400).optional(),
	});

	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		return res.status(400).json({
			status: 'error',
			message: validationResult.error.details[0].message,
		});
	}

	posts.forEach((post) => {
		if (post.id === id) {
			if (topic) {
				post.topic = topic;
			}
			if (text) {
				post.text = text;
			}
		}
	});

	res.json({ status: 'succes' });
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	posts = posts.filter((post) => post.id !== id);
	res.json({ status: 'succes' });
});

module.exports = { postsRouter: router };
