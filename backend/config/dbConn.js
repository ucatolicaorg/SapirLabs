const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://csanchezcabrera1:SapirLabs@cluster0.ivb1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});