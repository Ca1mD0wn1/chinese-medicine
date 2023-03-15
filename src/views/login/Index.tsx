// src/views/login/Index.tsx
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import store from 'store2'
import './style.less';
import { adminLoginFn } from '@/api/user/admin'
import { useAppDispatch } from '@/store/hook';
import { changeUsername, changeLoginState, changeLevel, changeToken } from '@/store/modules/admin';
import { useNavigate } from 'react-router-dom';

// import { generatePublicKey, generatePrivateKey } from '@/utils/crypto'
const App: React.FC = () => {
    const onFinish = (values: any) => {
        adminLoginFn(values).then((res) => {
            const result = res.data.data
            console.log(result);
            if (res.data.code === 201) {
                message.error("账号密码错误或者没有账户！")
            } if (res.data.code === 200) {
                message.success("登陆成功！")

                // rsa.generateKey(4096).then((key: any) => {
                //     // now you get the JWK public and private keys
                //     const publicKey = key.publicKey;

                //     const privateKey = key.privateKey;

                //     console.log(publicKey, "publicKey", privateKey, "privateKey");

                // })

                const user = {
                    loginState: true,
                    token: result.token,
                    username: result.username,
                    level: result.level,
                }
                store.set('user', user)

                dispatch(changeUsername(result.username))
                dispatch(changeLoginState(true))
                dispatch(changeLevel(result.level))
                dispatch(changeToken(result.token))
                navigate('/', { replace: true })
            }

        })
    };

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    return (
        <div id='loginForm'>
            <div className='loginBox'>
                <h1>中医药材后台管理系统</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ // 表单自动填充的字段
                        username: 'admin',
                        password: 'admin'
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入管理员账户!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账户" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登 录
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default App;