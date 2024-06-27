const Club = require('../models/club');

module.exports.index = async (req, res) => {
    const clubs = await Club.find({})
    res.render('clubs/index', { clubs })
}

module.exports.renderNewForm = (req, res) => {
    res.render('clubs/new')
}

module.exports.createClub = async (req, res, next) => {

    const club = new Club(req.body.club);
    club.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    club.author = req.user._id
    await club.save();
    req.flash('success', 'Successfully made a new club!');
    res.redirect(`/clubs/${club._id}`)
}

module.exports.showClub = async (req, res) => {
    const club = await Club.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!club) {
        req.flash('error', 'Cannot find that club!');
        return res.redirect('/clubs');
    }
    res.render('clubs/show', { club })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const club = await Club.findById(id)
    if (!club) {
        req.flash('error', 'Cannot find that club!');
        return res.redirect('/clubs');
    }
    res.render('clubs/edit', { club })
}

module.exports.updateClub = async (req, res) => {
    const { id } = req.params;
    const club = await Club.findByIdAndUpdate(id, { ...req.body.club });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    club.images.push(...imgs);
    await club.save()
    res.redirect(`/clubs/${club._id}`)
}

module.exports.deleteClub = async (req, res) => {
    const { id } = req.params;
    await Club.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted club');
    res.redirect('/clubs');
}