module.exports.testactivity = {
  type: 'reader:Publication',
  name: 'Minimal Test File',
  attachment: [
    {
      type: 'Document',
      mediaType: 'application/x-dtbncx+xml',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/OEBPS/toc.ncx',
          rel: ['alternate'],
          mediaType: 'application/x-dtbncx+xml'
        }
      ],
      'reader:path': 'OEBPS/toc.ncx'
    },
    {
      type: 'Document',
      mediaType: 'text/css',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/OEBPS/css/style.css',
          rel: ['alternate'],
          mediaType: 'text/css'
        }
      ],
      'reader:path': 'OEBPS/css/style.css'
    },
    {
      type: 'Document',
      mediaType: 'application/xhtml+xml',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/OEBPS/aftermath.xhtml',
          rel: ['alternate'],
          mediaType: 'application/xhtml+xml'
        }
      ],
      'reader:path': 'OEBPS/aftermath.xhtml',
      position: 0
    }
  ],
  totalItems: 1,
  attributedTo: [
    {
      type: 'Person',
      name: 'Baldur Bjarnason'
    }
  ],
  url: [
    {
      type: 'Link',
      href: 'http://example.com/test-epub.epub',
      rel: ['alternate'],
      mediaType: 'application/epub+zip'
    },
    {
      type: 'Link',
      href: 'http://example.com/OEBPS/content.opf',
      rel: ['alternate'],
      mediaType: 'application/oebps-package+xml'
    }
  ]
}

module.exports.guideAttachment = [
  {
    type: 'Document',
    mediaType: 'application/x-dtbncx+xml',
    url: [
      {
        type: 'Link',
        href: 'http://example.com/OEBPS/toc.ncx',
        rel: ['alternate'],
        mediaType: 'application/x-dtbncx+xml'
      }
    ],
    'reader:path': 'OEBPS/toc.ncx'
  },
  {
    type: 'Document',
    mediaType: 'text/css',
    url: [
      {
        type: 'Link',
        href: 'http://example.com/OEBPS/css/style.css',
        rel: ['alternate'],
        mediaType: 'text/css'
      }
    ],
    'reader:path': 'OEBPS/css/style.css'
  },
  {
    type: 'Document',
    mediaType: 'application/xhtml+xml',
    url: [
      {
        type: 'Link',
        href: 'http://example.com/OEBPS/cover.xhtml',
        rel: ['alternate'],
        mediaType: 'application/xhtml+xml'
      }
    ],
    'reader:path': 'OEBPS/cover.xhtml',
    name: 'Test file\n'
  },
  {
    type: 'Document',
    mediaType: 'application/xhtml+xml',
    url: [
      {
        type: 'Link',
        href: 'http://example.com/OEBPS/aftermath.xhtml',
        rel: ['alternate'],
        mediaType: 'application/xhtml+xml'
      }
    ],
    'reader:path': 'OEBPS/aftermath.xhtml',
    position: 0
  },
  {
    type: 'Image',
    mediaType: 'image/png',
    url: [
      {
        type: 'Link',
        href: 'http://example.com/OEBPS/placeholder-cover.png',
        rel: ['alternate'],
        mediaType: 'image/png'
      }
    ],
    'reader:path': 'OEBPS/placeholder-cover.png'
  },
  {
    type: 'Document',
    mediaType: 'application/oebps-package+xml',
    url: [
      {
        type: 'Link',
        href: 'http://example.com/OEBPS/content.opf',
        rel: ['alternate'],
        mediaType: 'application/oebps-package+xml'
      }
    ],
    'reader:path': 'OEBPS/content.opf'
  }
]
module.exports.testActivityAfter = {
  type: 'reader:Publication',
  name: 'Minimal Test File',
  attachment: [
    {
      type: 'Document',
      mediaType: 'application/x-dtbncx+xml',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/pub-id/0.ncx',
          rel: ['alternate'],
          mediaType: 'application/x-dtbncx+xml'
        }
      ],
      'reader:path': 'OEBPS/toc.ncx'
    },
    {
      type: 'Document',
      mediaType: 'text/css',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/pub-id/1.css',
          rel: ['alternate'],
          mediaType: 'text/css'
        }
      ],
      'reader:path': 'OEBPS/css/style.css'
    },
    {
      type: 'Document',
      mediaType: 'application/xhtml+xml',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/pub-id/2.xhtml',
          rel: ['alternate'],
          mediaType: 'application/xhtml+xml'
        }
      ],
      'reader:path': 'OEBPS/aftermath.xhtml',
      position: 0
    },
    {
      type: 'Image',
      mediaType: 'image/png',
      rel: ['cover'],
      url: [
        {
          type: 'Link',
          href: 'http://example.com/pub-id/3.png',
          rel: ['alternate'],
          mediaType: 'image/png'
        }
      ],
      'reader:path': 'OEBPS/placeholder-cover.png'
    },
    {
      type: 'Document',
      mediaType: 'application/oebps-package+xml',
      url: [
        {
          type: 'Link',
          href: 'http://example.com/pub-id/4.opf',
          rel: ['alternate'],
          mediaType: 'application/oebps-package+xml'
        }
      ],
      'reader:path': 'OEBPS/content.opf'
    }
  ],
  totalItems: 1,
  attributedTo: [
    {
      type: 'Person',
      name: 'Baldur Bjarnason'
    }
  ],
  url: [
    {
      type: 'Link',
      href: 'http://example.com/pub-id/test-epub-properties-cover.epub',
      rel: ['alternate'],
      mediaType: 'application/epub+zip'
    },
    {
      type: 'Link',
      href: 'http://example.com/pub-id/4.opf',
      rel: ['alternate'],
      mediaType: 'application/oebps-package+xml'
    }
  ],
  icon: {
    type: 'Image',
    summary: 'EPUB Cover',
    url: 'http://example.com/pub-id/3.png',
    mediaType: 'image/png'
  }
}
