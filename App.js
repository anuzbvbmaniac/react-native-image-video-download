import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Platform, PermissionsAndroid, TouchableOpacity, Dimensions,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';
import MainLayout from './src/screens/MainLayout';

const App = () => {
    const checkPermission = async () => {
        /*
        * Check Platform ? IOS : Android
        * IOS ? Start Download : ASK For Runtime Permission
        */
        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {
                const grantAccess = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                        title: 'Storage Permission Required',
                        message: 'This app needs access to your storage to download media.',
                    },
                );

                if (grantAccess === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted then Start Download
                    console.log('Storage Permission Granted');
                    downloadImage();
                } else {
                    // Permission Denied then Alert 'Storage Permission Not Granted'
                    console.log('Storage Permission Not Granted');
                    alert('Storage Permission Not Granted');
                }
            } catch (e) {
                console.warn(e);
            }
        }
    };

    /**
     *  Main fn to download the Image
     */
    const downloadImage = () => {
        // Time suffix for filename
        let date = new Date();
        // Image URL
        let imageURL = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/34f52a100739959.5f0f4bda1593e.png';
        // Extension of the File
        let ext = getExtension(imageURL);
        ext = '.' + ext[0];

        /**
         * Get config and fs from RNFetchBlob
         * config: to pass download related options
         * fs: to get the directory path where we want to save our image
         */
        const {config, fs} = RNFetchBlob;
        let PictureDirectory = fs.dirs.PictureDir;

        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // for Android Only
                useDownloadManager: true,
                notification: true,
                path: PictureDirectory + '/unsDownload_image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Image',
            },
        };

        config(options)
            .fetch('GET', imageURL)
            .then(res => {
                console.log('res -> ', JSON.stringify(res));
                alert('Download Successful.');
            });
    };

    const checkPermissionVideo = async () => {
        /*
        * Check Platform ? IOS : Android
        * IOS ? Start Download : ASK For Runtime Permission
        */
        if (Platform.OS === 'ios') {
            downloadVideo();
        } else {
            try {
                const grantAccess = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                        title: 'Storage Permission Required',
                        message: 'This app needs access to your storage to download media.',
                    },
                );

                if (grantAccess === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted then Start Download
                    console.log('Storage Permission Granted');
                    downloadVideo();
                } else {
                    // Permission Denied then Alert 'Storage Permission Not Granted'
                    console.log('Storage Permission Not Granted');
                    alert('Storage Permission Not Granted');
                }
            } catch (e) {
                console.warn(e);
            }
        }
    };

    /**
     *  Main fn to download the Image
     */
    const downloadVideo = () => {
        // Time suffix for filename
        let date = new Date();
        // Image URL
        let videoURL = 'https://www.w3schools.com/html/mov_bbb.mp4';
        // Extension of the File
        let ext = getExtension(videoURL);
        ext = '.' + ext[0];

        /**
         * Get config and fs from RNFetchBlob
         * config: to pass download related options
         * fs: to get the directory path where we want to save our image
         */
        const {config, fs} = RNFetchBlob;
        let VideoDirectory = fs.dirs.MovieDir;

        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // for Android Only
                useDownloadManager: true,
                notification: true,
                path: VideoDirectory + '/unsDownload_video_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Videos',
            },
        };

        config(options)
            .fetch('GET', videoURL)
            // listen to download progress event, every 10%
            .progress({count: 10}, (received, total) => {
                console.log(received + ' ' + total);
                // Progress is not responding
                // console.log('Download progress: ' + Math.floor((received / total) * 100) + '%');
            })
            .then(res => {
                console.log('res -> ', JSON.stringify(res));
                alert('Video Download Successful.');
            })
            .catch(err => {
                console.warn('Download Failed');
                console.warn(err);
            });
    };


    /**
     * // Get the file extension
     * @param filename
     * @returns {any}
     */
    const getExtension = filename => {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    };

    return (
        <MainLayout />
        // <View style={styles.container}>
        //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        //         <Text style={{fontSize: 30, textAlign: 'center'}}>
        //             React Native Image Download
        //         </Text>
        //         <Image
        //             style={{width: 600, height: 200, resizeMode: 'contain', margin: 15, borderRadius: 20, flex: 2}}
        //             resizeMode={'contain'}
        //             source={{uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/34f52a100739959.5f0f4bda1593e.png'}}
        //         />
        //         <TouchableOpacity
        //             style={styles.button}
        //             activeOpacity={.9}
        //             onPress={checkPermission}
        //         >
        //             <Text style={styles.text}>Download Image</Text>
        //         </TouchableOpacity>
        //
        //         <View style={styles.backgroundVideo}>
        //             <Video
        //                 source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
        //                 style={styles.video}
        //             />
        //         </View>
        //
        //         <TouchableOpacity
        //             style={styles.button}
        //             activeOpacity={.9}
        //             onPress={checkPermissionVideo}
        //         >
        //             <Text style={styles.text}>Download Video</Text>
        //         </TouchableOpacity>
        //
        //     </View>
        // </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: 'orange',
        margin: 10,
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
    },
    backgroundVideo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    video: {
        top: 0,
        left: 0,
        bottom: 0,
        width: 150,
        height: 100,
        right: 0,
    },
});

export default App;
