/**
 * 邮箱发送
 * @param  {Object}  pm 对方信息
*/
const nodemailer = require("nodemailer");
const Transporter = nodemailer.createTransport({
    host: 'xxxxx',
    secure: true,
    auth: {
        user: 'xxxxx', // 发送方的邮箱
        pass: 'xxxxx' // smtp 的授权码
    }
});

function getCode() {
    let verCode = Math.floor((Math.random() * 1000000) + 1);
    if (verCode < 100000) {
        return getCode()
    }
    return verCode
}



// 随机6位数
exports.getSixCode = () => {
    return getCode()
}

exports.sendMailer = (pm) => {
    return new Promise((resolve, reject) => {
        let title = "", html = "";
            title = '【验证码】';
            html = `<div style="font-size: 18px;display: inline-block;">
        <p>您好！　"${pm.userAccount}" </p>
		<div style="text-indent: 2em;">
            <p>您的验证码为：
            <span style="color:red;font-weight: bold;"> ${pm.content} </span>，3分钟内有效，请不要泄露给他人。</p>
            <p>请在页面中输入验证码以完成验证，如非本人操作，请忽略本封邮件即可</p>
            <p style="float: right;">祝您工作顺利，心想事成🎉🎉🎉</p>
		</div>
		</div>`;
        // 定义transport对象并发送邮件
        Transporter.sendMail({
            from: `"蝌蚪云" <autchan@163.com>`, // 发送方邮箱的账号
            to: pm.email, // 邮箱接受者的账号
            subject: title,
            html,
        }, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    })
}
