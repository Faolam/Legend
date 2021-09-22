module.exports = {
    activity: (bot, perfilActivity, Interval, type) => {
        try {
            var authNumber = 0; 
            setInterval(() => {
                bot.user.setActivity(`${perfilActivity[authNumber++ % perfilActivity.length]}`, {
                    type: type
                })
            }, Interval);
        } catch(err) {
            console.log(errors['err#12'] + `Erro: ${err}`);
        }
    }, 
    status: (bot, Status) => {
        try {
            bot.user.setStatus(Status);
        } catch(err) {
            console.log(errors['err#12'] + `Erro: ${err}`);
        }
    }
};