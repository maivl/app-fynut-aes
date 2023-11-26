"use client";
import { useMemo, useState } from 'react';
import { Alert, List, Switch, Form, Input, Button, notification } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const ListItem = List.Item;

const encodeText = async (text: string, key: string, iv: string) => {
    const key2 = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key), 
        "AES-CBC",
        false,
        ["encrypt", "decrypt"]
    );

    console.log(key2);

    const data = new TextEncoder().encode(text);

    const iv2 = new TextEncoder().encode(iv);
    console.log(iv2);
      
    console.log(key2);

    const res = await window.crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv2
        },
        key2, // 使用上面创建的密钥
        data // 要加密的数据
    );
    const encryptedRes = btoa(String.fromCharCode(...new Uint8Array(res)));
    return encryptedRes;
};
const decodeText = async (base64Text: string, key: string, iv: string) => {
    const key2 = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key), 
        "AES-CBC",
        false,
        ["encrypt", "decrypt"]
    );
    const data = new Uint8Array(atob(base64Text).split('').map(c => c.charCodeAt(0)));
    const iv2 = new TextEncoder().encode(iv);
    const res = await window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv2
        },
        key2,
        data
    );
    const decryptedRes = new TextDecoder().decode(res);
    return decryptedRes;
};

const encodeFile = async () => {
    //
    return '';
};
const decodeFile = async () => {
    //
    return '';
};

export default function Home() {
    const [api, contextHolder] = notification.useNotification();
    //
    const [type, setType] = useState<'text'|'file'>('text');
    const [text, setText] = useState('');
    const [key, setKey] = useState('1234567890123456');
    const [iv, setIv] = useState('1234567890123456');

    const [resText, setRestText] = useState('');

    
    //
    const handleEncrypto = async () => {
        //
        if(type === 'text'){
            const res = await encodeText(text, key, iv);
            setRestText(res);
        } else {
            const res = await encodeFile();
        }
    };

    const handleDecode = async () => {
        if(type === 'text'){
            const res = await decodeText(text, key, iv).catch((err) => {
                console.log(err);
                api.open({
                    message: 'Error',
                    description: JSON.stringify(err)
                });
                return '';
            });
            setRestText(res);
        } else {
            const res = await decodeFile();
        }
    };


    console.log('----res: ' + resText);

    const switchVal = type === 'file' ? true: false;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Alert message='仅用来测试，请谨慎使用' banner className={styles.notice} showIcon={false} />
            </div>
            <div className={styles.body}>
                <List>
                    <Form>
                        <ListItem>
                            <Switch checked={switchVal} onChange={(val) => {setType(val? 'file': 'text');}} className={styles.switch} />
                        </ListItem>
                        <ListItem>
                            <Form.Item
                                label={<div className={styles.label}>密码</div>}
                                name='password'
                            >
                                <Input placeholder='1234567812345678(默认)' value={key} onChange={(evt) => { setKey(evt.target.value);}} className={styles.input} maxLength={16} />
                            </Form.Item>
                        </ListItem>
                        <ListItem>
                            <Form.Item
                                label={<div className={styles.label}>Iv</div>}
                                name='iv'
                            >
                                <Input placeholder='1234567812345678(默认)' value={iv} onChange={(evt) => { setIv(evt.target.value);}} className={styles.input} maxLength={16} />
                            </Form.Item>
                        </ListItem>
                        {
                            type === 'text' && (
                                <ListItem>
                                    <Form.Item
                                        label={<div className={styles.label}>文本</div>}
                                        name='text'
                                    >
                                        <Input placeholder='Text' value={text} onChange={(evt) => { setText(evt.target.value);}} className={styles.input} maxLength={500} />
                                    </Form.Item>
                                </ListItem>
                            )
                        }
                        {
                            type === 'file' && (
                                <ListItem>
                                    <Form.Item
                                        name='file'
                                    >
                                        <div className={styles.file}>
                                            <FileImageOutlined />
                                        </div>
                                    </Form.Item>
                                </ListItem>
                            )
                        }
                        <Form.Item>
                            <div>
                                <Input.TextArea value={resText} autoSize className={styles['res-text']} />
                            </div>
                        </Form.Item>
                    </Form>
                </List>
            </div>
            <div className={styles.footer}>
                <div className={styles['btn-group']}>
                    <div>
                        <Button type='primary' size='middle' className={styles.btn} onClick={handleEncrypto}>加密</Button>
                    </div>
                    <div>
                        <Button size='middle' className={styles.btn} onClick={handleDecode}>解密</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}