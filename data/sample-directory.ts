import type {CanHaveChildren} from '@garbee/tree/functions/flatten.js';

interface Content extends CanHaveChildren<Content> {
  type: 'file' | 'directory';
  name: string;
}

const directoryStructure: Array<Content> = [
  {
    type: 'directory',
    name: 'Projects',
    children: [
      {
        type: 'file',
        name: 'project-1.docx',
      },
      {
        type: 'file',
        name: 'project-2.docx',
      },
      {
        type: 'directory',
        name: 'project-3',
        children: [
          {
            type: 'file',
            name: 'project-3A.docx',
          },
          {
            type: 'file',
            name: 'project-3B.docx',
          },
          {
            type: 'file',
            name: 'project-3C.docx',
          },
        ]
      },
      {
        type: 'file',
        name: 'project-4.docx',
      },
      {
        type: 'directory',
        name: 'project-5',
        children: [
          {
            type: 'file',
            name: 'project-5A.docx',
          },
          {
            type: 'file',
            name: 'project-5B.docx',
          },
          {
            type: 'file',
            name: 'project-5C.docx',
          },
        ],
      },
    ],
  },
  {
    type: 'directory',
    name: 'Reports',
    children: [
      {
        type: 'directory',
        name: 'report-1',
        children: [
          {
            type: 'file',
            name: 'report-1A.docx',
          },
          {
            type: 'file',
            name: 'report-1B.docx',
          },
          {
            type: 'file',
            name: 'report-1C.docx',
          },
        ],
      },
      {
        type: 'directory',
        name: 'report-2',
        children: [
          {
            type: 'file',
            name: 'report-2A.docx',
          },
          {
            type: 'file',
            name: 'report-2B.docx',
          },
          {
            type: 'file',
            name: 'report-2C.docx',
          },
          {
            type: 'file',
            name: 'report-2D.docx',
          },
        ],
      },
      {
        type: 'directory',
        name: 'report-3',
        children: [
          {
            type: 'file',
            name: 'report-3A.docx',
          },
          {
            type: 'file',
            name: 'report-3B.docx',
          },
          {
            type: 'file',
            name: 'report-3C.docx',
          },
          {
            type: 'file',
            name: 'report-3D.docx',
          },
        ],
      },
    ],
  },
  {
    type: 'directory',
    name: 'Letters',
    children: [
      {
        type: 'directory',
        name: 'letter-1',
        children: [
          {
            type: 'file',
            name: 'letter-1A.docx',
          },
          {
            type: 'file',
            name: 'letter-1B.docx',
          },
          {
            type: 'file',
            name: 'letter-1C.docx',
          },
        ],
      },
      {
        type: 'directory',
        name: 'letter-2',
        children: [
          {
            type: 'file',
            name: 'letter-2A.docx',
          },
          {
            type: 'file',
            name: 'letter-2B.docx',
          },
          {
            type: 'file',
            name: 'letter-2C.docx',
          },
          {
            type: 'file',
            name: 'letter-2D.docx',
          },
        ],
      },
      {
        type: 'directory',
        name: 'letter-3',
        children: [
          {
            type: 'file',
            name: 'letter-3A.docx',
          },
          {
            type: 'file',
            name: 'letter-3B.docx',
          },
          {
            type: 'file',
            name: 'letter-3C.docx',
          },
          {
            type: 'file',
            name: 'letter-3D.docx',
          },
        ],
      },
    ],
  },
];


export {
  type Content,
  directoryStructure,
};
