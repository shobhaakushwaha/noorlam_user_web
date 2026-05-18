"use client";

import React, { useRef, useMemo } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const GoogleLocation = ({ setValue, register, error, watch, onClose }) => {
    const autocompleteRef = useRef(null);
    const memoizedLibraries = useMemo(() => libraries, []);

    // Load Google Maps Script Once
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: memoizedLibraries,
    });

    // Handle Place Selection
    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place || !place.geometry) return;

        const fullAddress = place.formatted_address;
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();

        setValue("address.fullAddress", fullAddress, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setValue("address.latitude", latitude.toString());
        setValue("address.longitude", longitude.toString());
        onClose()
    };

    // Handle Current Location
    const handleCurrentLocation = () => {
        if (!navigator.geolocation || !window.google) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const geocoder = new window.google.maps.Geocoder();

                geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                    if (status === "OK" && results.length > 0) {
                        const address = results[0].formatted_address;

                        setValue("address.fullAddress", address, {
                            shouldDirty: true,
                            shouldValidate: true,
                        });
                        setValue("address.latitude", lat.toString());
                        setValue("address.longitude", lng.toString());
                    }
                    onClose()
                });
            },
            (error) => console.error("Geolocation error:", error),
            { enableHighAccuracy: true }
        );
    };

    if (loadError) return null;
    if (!isLoaded) return <div className="p-2">Loading...</div>;

    return (
        <>
            {/* Google Autocomplete Input */}
            <Autocomplete
                onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                }
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Search your delivery address"
                    className="form-control input w-100"
                    autoComplete="on"
                    {...register("address.fullAddress")}
                //   readOnly
                />
            </Autocomplete>

            <div className="modal-current-location">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="#0F3D2E" strokeWidth="2" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#0F3D2E" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
            {/* Use Current Location */}
            <div
                className="current-location mt-2"
                onClick={handleCurrentLocation}
                style={{ cursor: "pointer" }}
            >
                Use current location
            </div>
        </>
    );
};

export default GoogleLocation;