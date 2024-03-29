import React, { useEffect, useState } from 'react';
import styles from "@/styles/Admin.module.scss";
import { useRouter } from 'next/router';

type TestType = 'list' | 'select'

interface IContent{
    answerKr: string
    distractors: string[];
    words: string[];
    tts: string;
}
interface IAdmin {
    subtitle: string;
    testType: TestType
    startDatetime: string;
    content: any
}

const initialData:IAdmin = {
    subtitle: '',
    testType: 'select',
    startDatetime: '',
    content: [
      {
        answerKr: '',
        distractors: [],
        words: [],
        tts: ''
      }
    ]
};

const AdminForm = () => {
    const [formData, setFormData] = useState<IAdmin>(initialData);
    const router = useRouter();

    const handleBasicInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedContent = [...formData.content];

        if (name === 'distractors' || name === 'words') {
            updatedContent[index][name] = value.split(',').map(item => item.trim());
        } else {
            updatedContent[index][name] = value;
        }
        setFormData({ ...formData, content: updatedContent });
    };

    const handleAddContent = () => {
        const newContent = {
          answerKr: '',
          distractors: [],
          words: [],
          tts: ''
        };
        setFormData({ ...formData, content: [...formData.content, newContent] });
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('/api/admin/list', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                  'Content-Type': 'application/json'
                }
            });
        
            if (response.ok) {
                router.push('/')
            } else {
                router.push('/')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles['admin-form-container']}>
            <h5>어드민 폼</h5>
            <form onSubmit={handleSubmit} className={styles['form-container']}>
                {/* 기본 입력 필드 */}
                <div className={styles['basic-container']}>
                    <input type="text" name="subtitle" value={formData.subtitle} onChange={handleBasicInputChange} placeholder="Subtitle" />
                    <select name="type" value={formData.testType} onChange={handleBasicInputChange}>
                      <option value="select">Select</option>
                      <option value="list">List</option>
                    </select>
                    <input type="datetime-local" name="startDatetime" value={formData.startDatetime} onChange={handleBasicInputChange} />
                </div>
                {/* 'content' 배열의 각 항목에 대한 입력 필드 */}
                {formData.content.map((item:IContent, index:number) => (
                  <div key={index} className={styles['form-content']}>
                    <h5>콘텐츠</h5>
                    <input type="text" name="answerKr" value={item.answerKr} onChange={(e) => handleContentInputChange(e, index)} placeholder="Answer (KR)" />
                    <input type="text" name="distractors" value={item.distractors.join(', ')} onChange={(e) => handleContentInputChange(e, index)} placeholder="Distractors (comma-separated)" />
                    <input type="text" name="words" value={item.words.join(', ')} onChange={(e) => handleContentInputChange(e, index)} placeholder="Words (comma-separated)" />
                    <input type="text" name="tts" value={item.tts} onChange={(e) => handleContentInputChange(e, index)} placeholder="TTS URL" />
                  </div>
                ))}
                <button type="button" onClick={handleAddContent}>Add Content</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );      
}

export default AdminForm;
