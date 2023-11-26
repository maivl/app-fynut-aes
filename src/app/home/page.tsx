"use client";
import { useState } from 'react';
import { Alert, List, Switch, Form, Input, Button, Space } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const ListItem = List.Item;

export default function Home() {
    //
    const [type, setType] = useState<'text'|'file'>('text');

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
                                <Input placeholder='1234567812345678(默认)' className={styles.input} maxLength={16} />
                            </Form.Item>
                        </ListItem>
                        <ListItem>
                            <Form.Item
                                label={<div className={styles.label}>Iv</div>}
                                name='iv'
                            >
                                <Input placeholder='1234567812345678(默认)' className={styles.input} maxLength={16} />
                            </Form.Item>
                        </ListItem>
                        {
                            type === 'text' && (
                                <ListItem>
                                    <Form.Item
                                        label={<div className={styles.label}>文本</div>}
                                        name='text'
                                    >
                                        <Input placeholder='Text' className={styles.input} maxLength={500} />
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
                    
                    </Form>
                </List>
            </div>
            <div className={styles.footer}>
                <div className={styles['btn-group']}>
                    <div>
                        <Button type='primary' size='middle' className={styles.btn}>加密</Button>
                    </div>
                    <div>
                        <Button size='middle' className={styles.btn}>解密</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}