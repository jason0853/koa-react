const Account = require('models/account');

exports.register = async ctx => {
  const { email, username, password } = ctx.request.body;

  let existing = null;

  try {
    existing = await Account.findByEmailOrUsername(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (existing) {
    ctx.status = 409;
    ctx.body =
      existing.email === ctx.request.body.email
        ? '동일한 이메일이 존재합니다.'
        : '동일한 아이디가 존재합니다.';
    return;
  }

  let account = null;

  try {
    account = await Account.localRegister(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = account.profile;
};
