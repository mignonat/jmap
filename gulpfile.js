const gulp = require('gulp')
const path = require('path')
const util = require('gulp-util')
const dest = require('gulp-dest')
const clean = require('gulp-clean')
const webpack = require('webpack-stream')
const gulpSync = require('gulp-sync')(gulp)
const fs = require('fs')

const ear_dir = '../applications/cpms.ear/cpms.war/js/client'
const ear_dir2 = '../../applications-builder/target/nqi/orchestra/applications/cpms.ear/cpms.war/js/client'
const build_dir = './target/build'
const material_dir = './node_modules/material-design-icons'
const titiBirthday = '1962-08-17T00:00:00Z'

/*************** CLEAN FILES ***************/

const cleanDirectories = (dirs) => {
    console.log('Deleting files in directories : '+dirs.join())
    return gulp.src(dirs, {read: false})
               .pipe(clean({force: true}))
}

gulp.task('delete-build-files', () => {
    return cleanDirectories([ build_dir ])
})

gulp.task('delete-ear-files', () => {
    return cleanDirectories([ ear_dir+'/*', ear_dir2+'/*' ])
})

gulp.task('clean-all', gulpSync.sync([
    'delete-ear-files',
    'delete-build-files'
]))

/*************** COPY FILES ****************/

gulp.task('copy-build-to-ear',  () => {
    console.log('Copying built files into ear')
gulp.src(build_dir+'/*')
    .pipe(dest(''))
    .pipe(gulp.dest(ear_dir))
return gulp.src(build_dir+'/*')
    .pipe(dest(''))
    .pipe(gulp.dest(ear_dir2))
})

/****************** BUILD ******************/

gulp.task('build-prod', gulpSync.sync([
    'webpack-prod',
]))

gulp.task('build-dev', gulpSync.sync([
    'webpack-dev'
]))

/************** CLEAN INSTALL **************/

gulp.task('clean-install-prod', gulpSync.sync([
    'clean-all',
    'webpack-prod',
    'copy-build-to-ear'
]))

gulp.task('clean-install-dev', gulpSync.sync([
    'clean-all',
    'webpack-dev',
    'copy-build-to-ear'
]))

/**************** BUNDLE ANALYSER ****************/

gulp.task('analyse-bundles-prod', gulpSync.sync([
    'webpack-prod-analyser'
]))

gulp.task('analyse-bundles-dev', gulpSync.sync([
    'webpack-dev-analyser'
]))

/**************** ENVIRONMENT ****************/

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production'
})

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development'
})

/****************** WEBPACK ******************/

// Check recursively in directory for the max modified date
const getDirMaxLastModifiedDate = (filePath, currentMaxDate) => {
    if (!currentMaxDate) currentMaxDate = new Date(titiBirthday) // we want a date far from the present :-)
    if (!filePath) filePath = path.join(path.resolve('.'), 'src')
    
    const fileStat = fs.statSync(filePath)
    const fileMaxDate = new Date(fileStat.mtime)

    if (fileMaxDate > currentMaxDate) currentMaxDate = fileMaxDate

    if (fs.lstatSync(filePath).isDirectory()) {
        const file = fs.readdirSync(filePath)
        file.forEach((childrenName) => {
            let childrenPath = path.join(filePath, childrenName)
            let childrenMax = getDirMaxLastModifiedDate(childrenPath, currentMaxDate)
            if (childrenMax > currentMaxDate) currentMaxDate = childrenMax
        })
    }

    return currentMaxDate
}

const getVendorFileLastModifiedDate = () => {
    try {
        const targetPath = path.join(path.resolve('.'), build_dir)
        const vendorFilePath = path.join(targetPath, 'vendor.js')
        const fileStat = fs.statSync(vendorFilePath)
        return new Date(fileStat.mtime)
    } catch (ex) {
        return new Date(titiBirthday)
    }
}

const noFileHasChanged = () => {
    const dirsPath = [ 
        path.join(path.resolve('.'), 'src'),
        path.join(path.resolve('.'), 'webpack')
    ]
    let maxLastModifiedDate
    dirsPath.forEach((dirPath) => {
        let dirMaxLastModifiedDate = getDirMaxLastModifiedDate(dirPath)
        if (!maxLastModifiedDate || 
            maxLastModifiedDate < dirMaxLastModifiedDate) maxLastModifiedDate = dirMaxLastModifiedDate
    })

    return maxLastModifiedDate < getVendorFileLastModifiedDate()
}

const checkEntryParam = (config) => {
    if (util.env.page) {
        //Set page variable like that : "npm run cid -- --page=search"
        const fileName = util.env.page.split('/')[0]
        config.entry = {
            [fileName] : path.join(path.resolve('.'), 'src/pages/'+util.env.page+'/index.js')
        }
        console.log('Param "page" detected, only page "'+util.env.page+'" will be bundled')
    }
}

const runWebPack = (webPackFile, runBundleAnalyser) => {
    if (noFileHasChanged()) {
        console.log('No changes detected !')
        return
    }
    const config = require(webPackFile)
    checkEntryParam(config)
    if (runBundleAnalyser) {
        /**
         * Used to vizualize generated bundles
         * After webpack finished, a tab in the browser will open automatically showing all bundle details
         * Accessible on http://127.0.0.1:8888
         * */
        config.plugins.push(new BundleAnalyzerPlugin())
    }
    return gulp.src('')
               .pipe(webpack(config))
               .pipe(gulp.dest(build_dir))
}

gulp.task('webpack-prod', ['set-prod-node-env'], () => runWebPack('./webpack/prod.js'))
gulp.task('webpack-dev', ['set-dev-node-env'], () => runWebPack('./webpack/dev.js'))
gulp.task('webpack-prod-analyser', ['set-prod-node-env'], () => runWebPack('./webpack/prod.js', true))
gulp.task('webpack-dev-analyser', ['set-dev-node-env'], () => runWebPack('./webpack/dev.js', true))