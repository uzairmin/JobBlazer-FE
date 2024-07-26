import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import html2pdf from 'html2pdf.js'

import { replaceNewLine } from '@utils/helpers'

export default function App({
    init = 'Start writing from here',
    value = '',
    name = null,
    download = false,
    h = 500,
    bar = false,
    onChange = null,
}) {
    const editorRef = useRef(null)

    const convertHTMLtoPDF = () => {
        const htmlContent = `${editorRef.current.getContent()}<br><br>`
        const options = {
            margin: 1,
            filename: 'coverletter.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }
        html2pdf(htmlContent, options)
    }

    return (
        <>
            <Editor
                textareaName={name}
                apiKey='cwe1lw25hfmuo0hjvs2u0aosqll2gzb83eqc9znkuywu43ci'
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={replaceNewLine(init)}
                value={value}
                init={{
                    height: h,
                    menubar: bar,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;}',
                }}
                onEditorChange={onChange}
            />
            {download && (
                <button
                    className='bg-[#10868a] hover:bg-[#209fa3] text-[#ffffff]  py-2 px-3 rounded inline-flex items-center float-right my-2'
                    onClick={convertHTMLtoPDF}
                >
                    Download
                </button>
            )}
        </>
    )
}
