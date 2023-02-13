const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagtData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagtData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagtData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagtData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagtData = await Tag.create(req.body);
    res.status(200).json(tagtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagtData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagtData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagtData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
