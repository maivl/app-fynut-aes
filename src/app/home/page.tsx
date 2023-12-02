"use client";
import { useMemo, useState } from 'react';
import { Alert, List, Switch, Form, Input, Button, Upload, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.module.scss';

const ListItem = List.Item;

const encodeText = async (text: string, rawKey: string, rawIv: string) => {
    const key = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(rawKey), 
        "AES-CBC",
        false,
        ["encrypt", "decrypt"]
    );

    const data = new TextEncoder().encode(text);

    const res = await window.crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: new TextEncoder().encode(rawIv)
        },
        key,
        data
    );
    const encryptedRes = btoa(String.fromCharCode(...new Uint8Array(res)));
    return encryptedRes;
};
const decodeText = async (base64Text: string, rawKey: string, rawIv: string) => {
    const key = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(rawKey), 
        "AES-CBC",
        false,
        ["encrypt", "decrypt"]
    );
    const data = Uint8Array.from(atob(base64Text), c => c.charCodeAt(0));
    const res = await window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: new TextEncoder().encode(rawIv)
        },
        key,
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
    const [type, setType] = useState<'text'|'file'>('file');
    const [text, setText] = useState('');
    const [key, setKey] = useState('1234567890123456');
    const [iv, setIv] = useState('1234567890123456');
    const [fileList, setFileList] = useState<any[]>([]);

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

    const handleUpload = async ({ file, fileList, event }: any) => {
        // console.log(file, fileList, event);
        // setFileList(fileList);
    };

    const handleOnChange = ({ file, fileList = [], event }: any) => {
        console.log(file, fileList, event);
        const newFileList = fileList.map((item: any) => (
            {
                ...item,
                status: 'done',
                url: URL.createObjectURL(item.originFileObj),
                thumbUrl: URL.createObjectURL(item.originFileObj)
            }
        ));
        setFileList(newFileList);
    };

    const switchVal = type === 'file' ? true: false;

    console.log(fileList);

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
                                label={<div className={styles.label}>密钥</div>}
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
                                        <Input.TextArea placeholder='Text' className={styles['file-text']} value={text} onChange={(evt) => { setText(evt.target.value);}} maxLength={500} />
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
                                            <Upload
                                                customRequest={handleUpload}
                                                onChange={handleOnChange}
                                                listType="picture-card" maxCount={1} accept="image/*,audio/*,video/*,text/*,application/*,.zip,.rar,.ppt,.pptx"
                                                fileList={fileList}
                                            >
                                                {
                                                    fileList.length >0 ?  null : (
                                                        <div>
                                                            <PlusOutlined />
                                                            <div style={{ marginTop: 8 }}>Upload</div>
                                                        </div>   
                                                    )
                                                }
                                            </Upload>
                                        </div>
                                    </Form.Item>
                                </ListItem>
                            )
                        }
                        <Form.Item>
                            <div>
                                <Input.TextArea value={resText} autoSize className={classNames(styles['file-text'], styles.res)} readOnly />
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
                <div className={styles.icp}>
                    <a href="javascript:;">@fynut</a>
                </div>
            </div>
        </div>
    );
}