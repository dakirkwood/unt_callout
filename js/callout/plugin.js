/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Simple CKEditor Widget (Part 1).
 *
 * Created out of the CKEditor Widget SDK:
 * http://docs.ckeditor.com/#!/guide/widget_sdk_tutorial_1
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'callout', {
	// This plugin requires the Widgets System defined in the 'widget' plugin.
	requires: 'widget',

	// Register the icon used for the toolbar button. It must be the same
	// as the name of the widget.
	icons: 'callout',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Register the simplebox widget.

		editor.widgets.add( 'callout', {
			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'aside(!callout,general,information,tip,advisory,attention); div(!content); header(!title); h2; h3; h4; h5; h6; a[!href]',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'aside(callout)',

			// Define two nested editable areas.
			editables: {

				title: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.title',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'a[!href,name,id,class]; br; em; h2; h3; h4; h5; h6;'
				},
				content: {
					selector: '.content',
					allowedContent: 'p; a[!href,name,id,class]; br; ul; ol; li; strong; em; table; tr; td; th; thead; tbody; tfoot; caption'
				}
			},

			// Define the template of a new Simple Box widget.
			// The template will be used when creating new instances of the Simple Box widget.
			template:
				'<aside class="widget callout">' +
					'<header class="title"><h2>Title</h2></header>' +
					'<div class="content"><p>Content</p></div>' +
				'</aside>',

			// Define the label for a widget toolbar button which will be automatically
			// created by the Widgets System. This button will insert a new widget instance
			// created from the template defined above, or will edit selected widget
			// (see second part of this tutorial to learn about editing widgets).
			//
			// Note: In order to be able to translate your widget you should use the
			// editor.lang.simplebox.* property. A string was used directly here to simplify this tutorial.
			button: 'Callout',

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'aside' && element.hasClass( 'callout' );
			},
			dialog: 'callout',
			defaults:{className:'information'},
			init: function() {
				if ( this.element.hasClass( 'general' )){
						this.setData( 'className', 'general' );
					}
				if ( this.element.hasClass( 'information' )){
						this.setData( 'className', 'information' );
					}
				if ( this.element.hasClass( 'tip' )){
						this.setData( 'className', 'tip' );
					}
				if ( this.element.hasClass( 'advisory' )){
						this.setData( 'className', 'advisory' );
					}
				if ( this.element.hasClass( 'attention' )){
						this.setData( 'className', 'attention' );
					}
			},
			data: function() {
				this.element.removeClass( 'general' );
				this.element.removeClass( 'information' );
				this.element.removeClass( 'tip' );
				this.element.removeClass( 'advisory' );
				this.element.removeClass( 'attention' );
				if ( this.data.className ){
					this.element.addClass( this.data.className );
				}
			}
		} );
		editor.execCommand('callout');
		editor.ui.addButton('callout',{
			label:'Callout',
			command:'callout',
			toolbar:''
		});
		CKEDITOR.dialog.add( 'callout', this.path + 'dialogs/callout.js' );
	}
} );
