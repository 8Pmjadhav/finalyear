
export function Danger({ errors }) {
    // Swal.fire({
    //     title: 'Custom Alert',
    //     html: `
    //         <div class="p-4 bg-white dark:bg-gray-800 rounded-md">
    //             <h2 class="text-lg font-semibold mb-2">This is a custom alert</h2>
    //             <p class="text-gray-600 dark:text-gray-400">You can customize this modal as per your requirements.</p>
    //         </div>
    //     `,
    //     icon: 'info',
    //     showCloseButton: true,
    //     confirmButtonText: 'OK',
        
    //     showClass: {
    //         popup: 'animate__animated animate__fadeIn'
    //     },
    //     hideClass: {
    //         popup: 'animate__animated animate__fadeOut'
    //     }
    // }
    // )
    return (
        <div className="p-4 mb-4 fixed top-20 z-50 text-sm text-black rounded-lg bg-red-500 border-2 border-gray-600 " role="alert">
            {errors}
        </div>
    )
}

export function Success({text}) {
    return (
        <div className="p-4 mb-4 text-sm fixed top-20 z-50 text-black rounded-lg bg-green-500" role="alert">
            <span className="font-medium">Success, </span> {text}
        </div>
    )
}