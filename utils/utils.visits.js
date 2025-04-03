// 访问频繁处理
const { sendMailer } = require("./utils.nodemailer");
const { notifyRobot } = require('./utils.tools')



const MAX_VISITS = 60; // 限制访问次数
const DELAY_TIME = 1000 * 6; // 定时删除时间
const TIMEOUT_TIME = 1000 * 60 * 20; // 超时时间

let visits = {}

const utilsVisits = {
    // 是否访问频繁
    isFrequent(userId,userAccount) {
        return new Promise((resolve, reject) => {
            // 如果不存在，则创建 启用删除定时器
            if(!visits[userId]){
                visits[userId] = {
                    count: 1,
                    userAccount,
                    time: setTimeout(() => {
                        delete visits[userId]
                    }, DELAY_TIME)
                }
               return resolve(false)
            }else{
                // 如果次数超过限制 则返回false
                if(visits[userId].count >= MAX_VISITS){
                    // 发送邮件通知
                    if(!visits[userId].email){
                        notifyRobot({title:"频繁访问提醒",content:`用户昵称：${visits[userId].userAccount}\n用户ID：${userId}\n请留意此用户的频繁访问`,cb:()=>{
                            visits[userId].email = true;
                        }})

                        // 发送邮件通知 
                        // sendMailer({
                        //     userId,
                        //     type: "frequent",
                        //     userAccount: visits[userId].userAccount,
                        //     email:"xxxxxxxx",
                        // }).then(_ok => {
                        //     console.log('_ok===', _ok)
                        //     visits[userId].email = true;
                        // }).catch(err => {
                        //     console.log(err)
                        // })
                    }
                    // 加长删除时间
                    clearTimeout(visits[userId].time)
                    visits[userId].time = setTimeout(() => {
                        delete visits[userId]
                    }, TIMEOUT_TIME)
                    return resolve(true)
                }
                visits[userId].count++;
                clearTimeout(visits[userId].time)
                visits[userId].time = setTimeout(() => {
                    delete visits[userId]
                }, DELAY_TIME)
                return resolve(false)
            }
        })
    },
}


module.exports = utilsVisits
