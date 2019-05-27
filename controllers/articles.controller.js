const Articles = require('../models/articles.model');

module.exports = {
    searchArticle: (req, res) => {
        let titleQuery = req.query.title
        let upper = titleQuery.charAt(0).toUpperCase() + titleQuery.substr(1).toLowerCase();
        Articles.find({
            title: {
                $regex: '.*' + upper + '.*'
            }
        }, (err, article) => {
            if (err) {
                res.status(400).send({
                    message: 'Failed to get article'
                })
            } else {
                res.status(200).send({
                    message: 'Article was succesfuly got',
                    data: article
                })

            }
        })
    },
    findAll(req, res) {
        Articles
            .find()
            .populate('author')
            .populate('comments.user')
            .then(response => {
                return res.status(200).json({
                    message: 'Successfully retrieved all articles',
                    data: response
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'Failed retrieved all articles',
                    err: err.message
                })
            })
    },
    findById(req, res) {
        Articles
            .findById({
                _id: req.params.id
            })
            .populate('author')
            .then(data => {
                return res.status(200).json({
                    message: `Succeed get article by id`,
                    data
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: `Failed get article by id`,
                    err
                })
            })
    },
    create: (req, res) => {
        Articles
            .create({
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                category: req.body.category
            })
            .then(response => {
                return res.status(200).json({
                    message: 'Successfully add new article',
                    data: response
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'Failed add new post ',
                    err: err.message
                })
            })
    },
    update: (req, res) => {
        Articles
            .findByIdAndUpdate({
                    _id: req.params.id
                },
                req.body, {
                    new: true
                })
            .then(response => {
                return res.status(200).json({
                    message: "Articles fields have been updated",
                    data: response
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: "Failed to update articles",
                    error: err
                })
            })
    },
    addComment: (req, res) => {
        let newComment = {
            comment,
            author
        } = req.body
        Articles
            .findByIdAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    comments: newComment
                }
            })
            .then(response => {
                return res.status(200).json({
                    message: 'Add comment to article success',
                    data: response
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'Add comment to article failed',
                    err: err.message
                })
            })
    },
    remove: (req, res) => {
        Articles
            .findByIdAndRemove({
                _id: req.params.id
            })
            .then(response => {
                return res.status(200).json({
                    message: "Successfully deleted articles"
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: "Failed to delete articles record",
                    error: err
                })
            })
    }
}