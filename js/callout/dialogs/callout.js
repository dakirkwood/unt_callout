// JavaScript Document
CKEDITOR.dialog.add( 'callout', function( editor ) {
    return {
        title: 'Edit Callout',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
						id: 'className',
						type: 'select',
						label: 'Callout Style',
						items: [
							[ 'General','general' ],
							[ 'Information','information' ],
							[ 'Tip','tip' ],
							[ 'Advisory','advisory' ],
							[ 'Attention','attention' ]
						],
						'default':'Information',
						setup: function( widget ) {
							this.setValue( widget.data.className );
						},
						commit: function( widget ) {
							widget.setData( 'className', this.getValue() );
						}
					}
                ]
            }
        ]
    };
} );